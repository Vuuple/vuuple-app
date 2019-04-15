const path = require('path');
const node = require('./docker');
const fs = require('fs');

async function getNodeKey(category) {
  let dockerPath;
  let nodeKeyFilePath;
  if (category == 'lender') {
    dockerPath = path.join(
      __dirname,
      '..',
      '/..',
      '/src',
      '/assets',
      '/resources',
      '/mail-resources',
      '/lender-resources',
      '/docker-compose.yml'
    );
    nodeKeyFilePath = path.join(
      __dirname,
      '..',
      '/..',
      '/src',
      '/assets',
      '/resources',
      '/mail-resources',
      '/lender-resources',
      '/network-resources',
      '/examples',
      '/7nodes',
      '/raft',
      '/pubkeyhash'
    );
  } else if (category == 'renter') {
    dockerPath = path.join(
      __dirname,
      '..',
      '/..',
      '/src',
      '/assets',
      '/resources',
      '/mail-resources',
      '/renter-resources',
      '/docker-compose.yml'
    );
    nodeKeyFilePath = path.join(
      __dirname,
      '..',
      '/..',
      '/src',
      '/assets',
      '/resources',
      '/mail-resources',
      '/renter-resources',
      '/network-resources',
      '/examples',
      '/7nodes',
      '/raft',
      '/pubkeyhash'
    );
  }
  await createNodeKey(dockerPath);
  return await readFile(nodeKeyFilePath);
}
async function createNodeKey(_path) {
  await node.start_docker(_path);
  await node.stop_docker(_path);
}

function readFile(_path) {
  // console.log('_path', _path);

  return fs.readFileSync(_path, { encoding: 'utf8' });
}
// getNodeKey('lender').then(enode => {
//   console.log(enode, 'enode');
// });
module.exports = getNodeKey;
