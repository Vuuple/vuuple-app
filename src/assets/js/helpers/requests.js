const axios = require('axios');
const spawn = require('cross-spawn');

module.exports.raft_add_peer = (endpoint, enode) => {
  let data = {
    jsonrpc: '2.0',
    method: 'raft_addPeer',
    params: [enode],
    id: 1
  };
  let headers = {
    'Content-Type': 'application/json',
    'Access-Control-Allow-Methods': 'PUT, GET, POST',
    'Access-Control-Allow-Headers':
      'Origin, X-Requested-With, Content-Type, Accept',
    'Access-Control-Allow-Origin': '*'
  };

  return axios.post(endpoint, data, { headers: headers });
};
module.exports.curlRaftAddPeer = enode => {
  const child = spawn
    .sync(
      'curl',
      [
        '-X',
        'POST',
        '-H',
        'Content-Type: application/json',
        '--data',
        `{ "jsonrpc": "2.0", "method": "raft_addPeer", "params": [${enode}], "id": 1 }`,
        'http://3.18.34.201:22000'
        // 'http://3.16.57.132:22001'
      ],
      { stdio: 'pipe' }
    )
    .stdout.toString();
  return JSON.parse(child);
};
