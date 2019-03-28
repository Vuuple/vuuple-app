const spawn = require('cross-spawn');

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
