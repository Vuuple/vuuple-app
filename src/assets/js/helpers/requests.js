const axios = require('axios');

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
