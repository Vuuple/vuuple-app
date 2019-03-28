const fs = require('fs');
const path = require('path');

module.exports.alter_script = id => {
  if (id == null) {
    return null;
  }
  else {
    let frp = path.join(__dirname, '..', 'resources', '/raft-start-template.sh');
    let fwp = path.join(__dirname, '..', 'resources', 'single-node', '/examples', '/7nodes', '/raft-start.sh');
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