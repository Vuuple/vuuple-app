const path = require('path');
const node = require('./docker');
const fs = require('fs');

async function getEnode(category) {
  let dockerPath;
  let enodeFilePath;
  if (category == 'lender') {
    dockerPath = path.join(
      '../../src/assets/resources/mail-resources/lender-resources/docker-compose.yml'
    );
    enodeFilePath = path.join(
      '../../src/assets/resources/mail-resources/lender-resources/network-resources/examples/7nodes/raft/pubkeyhash'
    );
  } else if (category == 'renter') {
    dockerPath = path.join(
      '../../src/assets/resources/mail-resources/renter-resources/docker-compose.yml'
    );
    enodeFilePath = path.join(
      '../../src/assets/resources/mail-resources/renter-resources/network-resources/examples/7nodes/raft/pubkeyhash'
    );
  }
  await createEnode(dockerPath);
  return await readFile(enodeFilePath);
}
async function createEnode(_path) {
  await node.start_docker(_path);
}

function readFile(_path) {
  return fs.readFileSync(_path, { encoding: 'utf8' });
}
getEnode('lender').then(enode => {
  console.log(enode, 'enode');
});
module.exports = getEnode;
