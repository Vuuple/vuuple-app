const axios = require('axios');

module.exports.raft_add_peer = (endpoint, enode) => {
  let data = {
    jsonrpc: '2.0',
    method: 'raft_addPeer',
    params: [enode],
    id: 1
  }
  let headers = {
    'Content-Type': 'application/json'
  };
  return axios.post(endpoint, data, {headers: headers});
};
