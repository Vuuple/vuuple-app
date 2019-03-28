const spawn = require('cross-spawn');
const fs = require('fs');
const path = require('path');

module.exports.start_docker = (file) => {
  docker_compose('up', file)
    .then(child => {
      const { pid } = child;
      console.log(`Node started (PID ${pid})`);
    })
    .catch(err => {
      console.log(err);
    });
}

module.exports.stop_docker = (file) => {
  docker_compose('down', file)
    .then(child => {
      const { pid } = child;
      console.log(`Node stopped (PID ${pid})`);
    })
    .catch(err => {
      console.log(err);
    });
}




docker_compose = (cmd, file) => {
  let child;
  if (cmd == 'up') {
    child = spawn.sync('docker-compose', ['-f', file, cmd, '-d'], {
      stdio: 'inherit'
    });
  } else {
    child = spawn.sync('docker-compose', ['-f', file, cmd], {
      stdio: 'inherit'
    });
  }
  return new Promise((resolve, reject) => {
    const { pid } = child;
    if (pid) {
      resolve(child);
    } else {
      reject(child);
    }
  });
}

module.exports.list_containers = () => {
  const child = spawn.sync('docker', ['ps', '-a'], {
    stdio: 'inherit'
  });
  return child;
}

module.exports.inspect = (container) => {
  child = spawn.sync('docker', ['inspect', container], {
    stdio: 'inherit'
  });
  return child;
}

module.exports.check_health = (container) => {
  const child = spawn.sync('docker', ['inspect', "--format='{{json .State}}'", container], {
    stdio: 'inherit'
  });
  return child;
}

module.exports.check_status = (container) => {
  const child = spawn.sync('docker', ['inspect', "--format='Status: {{json .State.Status}}'", container], {
    stdio: 'inherit'
  });
  return child;
}

module.exports.alter_script = (id,inputPath,outputPath,fileName) => {
  if(id == null) {
    return null;
  }
  else {
    let frp = path.join(inputPath, fileName);
    let fwp = path.join(outputPath, fileName);
    // TODO : if condition for file exist
    // if yes , delete it
    if (fs.existsSync(fwp)) {
      // Do something
      try {
        fs.unlinkSync(fwp);
        console.log(`successfully deleted ${fwp}`);
      } catch (err) {
        // handle the error
        throw err;
      }
    }

    // let frp = path.join(__dirname, '/examples', '/7nodes', '/raft-start-template.sh');
    // let fwp = path.join(__dirname, '/examples', '/7nodes', '/raft-start.sh');

    fs.readFile(path.join(frp), (err, data) => {
      if (err) throw err;
      else {
        let argIndex = data.indexOf('--raftjoinexisting');
        let startIndex = argIndex + 18;
        let endIndex = startIndex + id.length;
        fd = data.slice(0, startIndex) + ` ${id} ` + data.slice(endIndex, data.length);
        fs.writeFile(fwp, fd, (err) => {
          if (err) {
            throw err;
          }
          else {
            return;
          }
        });
      }
    });
  }
}



module.exports.raft_add_peer = (enode,endPoint) => {
  // consider do it with rpc call without  curl , what if the user doesn't install it ?!
  const child = spawn.sync(
    'curl',
    [
      '-X',
      'POST',
      '-H',
      'Content-Type: application/json',
      '--data',
      `{ "jsonrpc": "2.0", "method": "raft_addPeer", "params": [${enode}], "id": 1 }`,
      `${endPoint}`
    ],
    { stdio: 'pipe' }
  ).stdout.toString();
  return JSON.parse(child);
};
