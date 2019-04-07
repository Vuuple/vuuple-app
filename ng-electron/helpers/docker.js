const spawn = require('cross-spawn');

module.exports.start_docker = file => {
  docker_compose('up', file)
    .then(child => {
      const { pid } = child;
      console.log(`Node started (PID ${pid})`);
    })
    .catch(err => {
      console.log(err);
    });
};

module.exports.stop_docker = file => {
  docker_compose('down', file)
    .then(child => {
      const { pid } = child;
      console.log(`Node stopped (PID ${pid})`);
    })
    .catch(err => {
      console.log(err);
    });
};

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
};

module.exports.list_containers = () => {
  // this command doesn't help us as we want to get all up and running conatainers as well as only our containers //#endregion
  // const child = spawn.sync('docker', ['ps', '-a'], {
  //   stdio: 'inherit'
  // });
  return new Promise((resolve, reject) => {
    const networkName = 'network=network-resources_quorum-examples-net';
    const filter = `-f ${networkName}`;
    const formate = '--format={{.ID}}';
    // docker ps -f "network=network-resources_quorum-examples-net" --format "{{.ID}}: {{.Names}}"

    const child = spawn('docker', ['ps', filter, formate], {
      stdio: ['ignore', 'pipe', 'pipe']
    });

    let result = '';
    child.stdout.on('data', function(data) {
      result += data.toString();
    });
    child.on('close', function(code) {
      return resolve(result.split('\n'));
    });
    child.stderr.on('data', data => reject(String(data).trim()));
  });
};

module.exports.inspect = container => {
  child = spawn.sync('docker', ['inspect', container], {
    stdio: 'inherit'
  });
  return child;
};

module.exports.check_health = container => {
  return new Promise((resolve, reject) => {
    const child = spawn(
      'docker',
      ['inspect', '--format={{json .State.Health.Status}}', container],
      {
        stdio: ['ignore', 'pipe', 'pipe']
      }
    );

    let result = '';
    child.stdout.on('data', function(data) {
      result += data.toString();
    });
    child.on('close', function(code) {
      return resolve(result);
    });
    child.stderr.on('data', data => reject(String(data).trim()));
  });
};

module.exports.check_status = container => {
  return new Promise((resolve, reject) => {
    const child = spawn(
      'docker',
      ['inspect', '--format={{json .State.Status}}', container],
      {
        stdio: ['ignore', 'pipe', 'pipe']
      }
    );

    let result = '';
    child.stdout.on('data', function(data) {
      result += data.toString();
    });
    child.on('close', function(code) {
      return resolve(result);
    });
    child.stderr.on('data', data => reject(String(data).trim()));
  });
};
module.exports.dockerEvnetsListener = filter => {
  return new Promise((resolve, reject) => {
    const child = spawn(
      'docker',
      ['events', '--format={{json .State.Status}}', filter],
      {
        stdio: ['ignore', 'pipe', 'pipe']
      }
    );

    let result = '';
    child.stdout.on('data', function(data) {
      result += data.toString();
    });
    child.on('close', function(code) {
      return resolve(result);
    });
    child.stderr.on('data', data => reject(String(data).trim()));
  });
};
