const path = require('path');
const node = require('./docker');
const fs = require('fs');
const networkPath = require('electron').remote.getGlobal('networkPath');

async function getNodeKey() {
  let dockerPath;
  let nodeKeyFilePath;

  dockerPath = path.join(networkPath, '/init.yml');
  nodeKeyFilePath = path.join(
    networkPath,

    '/examples',
    '/7nodes',
    '/raft',
    '/pubkeyhash'
  );

  await createNodeKey(dockerPath);
  return await readFile(nodeKeyFilePath);
}
async function createNodeKey(_path) {
  await node.start_docker(_path);
  await node.stop_docker(_path);
}

function readFile(_path) {
  // console.log('_path', _path);

  return fs.readFileSync(_path, { encoding: 'utf8' }).trim();
}
// getNodeKey('lender').then(enode => {
//   console.log(enode, 'enode');
// });
module.exports = getNodeKey;
