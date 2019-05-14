const fs = require('fs');
const path = require('path');

module.exports.alter_script = (id, input, output) => {
  if (id == null) {
    return null;
  } else {
    // let frp = path.join(__dirname, '..', 'resources', '/raft-start-template.sh');
    // let fwp = path.join(__dirname, '..', 'resources', 'single-node', '/examples', '/7nodes', '/raft-start.sh');
    fs.readFile(path.join(input), (err, data) => {
      if (err) throw err;
      else {
        let argIndex = data.indexOf('--raftjoinexisting');
        let startIndex = argIndex + 18;
        let endIndex = startIndex + id.length;
        fd =
          data.slice(0, startIndex) +
          ` ${id} ` +
          data.slice(endIndex, data.length);
        fs.writeFile(output, fd, err => {
          if (err) {
            throw err;
          } else {
            return;
          }
        });
      }
    });
  }
};
module.exports.alter_staticNodes = (newNodes, input, output) => {
  jsonReader(input, (err, nodes) => {
    if (err) {
      console.log(err, 'err');
      return;
    }
    console.log(typeof nodes, nodes.length, ' type of nodes in file'); // => "Infinity Loop Drive"
    if (newNodes) {
      newNodes.forEach(element => {
        // console.log(element, 'element');

        nodes.push(element);
        console.log(nodes, 'nodes in file'); // => "Infinity Loop Drive"
      });
      console.log(nodes, 'nodes in file'); // => "Infinity Loop Drive"
    }
    jsonWriter(output, nodes, (nodes, err) => {
      if (err) {
        console.log(err, 'err');
        return;
      }
      console.log(nodes, 'nodes written to  file'); // => "Infinity Loop Drive"
    });
  });
};

function jsonReader(filePath, cb) {
  fs.readFile(filePath, (err, fileData) => {
    if (err) {
      return cb && cb(err);
    }
    try {
      const object = JSON.parse(fileData);
      return cb && cb(null, object);
    } catch (err) {
      return cb && cb(err);
    }
  });
}
function jsonWriter(filePath, data, cb) {
  fs.writeFile(filePath, JSON.stringify(data), err => {
    if (err) {
      return cb && cb(err);
    }
    try {
      return cb && cb(true);
    } catch (err) {
      return cb && cb(err);
    }
  });
}
