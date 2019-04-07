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

  const networkName = 'network=network-resources_quorum-examples-net';
  const filter = `-f ${networkName}`;
  const formate = '--format="{{.ID}}: {{.Names}}"';
  // docker ps -f "network=network-resources_quorum-examples-net" --format "{{.ID}}: {{.Names}}"

  const child = spawn.sync('docker', ['ps', filter, formate], {
    stdio: 'inherit'
  });

  child.stdout.on('data', data =>
    console.log('[node] child.stdout', String(data).trim())
  );
  child.stderr.on('data', data =>
    console.log('[node] child.stderr', String(data).trim())
  );

  return child;
};
function run(cmd, callback) {
  var spawn = require('child_process').spawn;
  var command = spawn(cmd);
  var result = '';
  command.stdout.on('data', function(data) {
    result += data.toString();
  });
  command.on('close', function(code) {
    return callback(result);
  });
}

run('ls', function(result) {
  console.log(result);
});
module.exports.inspect = container => {
  child = spawn.sync('docker', ['inspect', container], {
    stdio: 'inherit'
  });
  return child;
};

module.exports.check_health = container => {
  const child = spawn.sync(
    'docker',
    ['inspect', "--format='{{json .State}}'", container],
    {
      stdio: 'inherit'
    }
  );
  return child;
};

module.exports.check_status = container => {
  const child = spawn.sync(
    'docker',
    ['inspect', "--format='Status: {{json .State.Status}}'", container],
    {
      stdio: 'inherit'
    }
  );
  return child;
};
