const requests = require('./requests');
const alter = require('./alter');
const mailer = require('./mail');
const networkPath = require('electron').remote.getGlobal('networkPath');
const template = require('../../resources/mail-resources/mail-templates.json');

async function getRaftId(ip, endpoint, enode) {
  // const endpoint = 'http://3.18.34.201:22004';
  // const enode = `enode://3f36c87a685f6d6947d685fd76d29f08f39b1eea9570a765b8cb6ee94b89755a01e6fc61e9e460a9e6310dbf0a2e12f126c54fe09c23e6b4176ea8f7835c33ea@18.191.179.75:22000?discport=0&raftport=50400`; // from db
  const resObj = await requests.raft_add_peer(endpoint, enode);
  let id;
  if (resObj.data.result == undefined) {
    id = null;
    console.log(resObj.data);
  } else {
    id = resObj.data.result;
    console.log(id);
  }

  return { id };
}
async function sendConfirmationMail(to) {
  //TODO: zip the folder and send it
  // send
  return await mailer.send_email(
    to,
    '"Vuuple App" <support@vuuple.com>',
    template.networkConfirmation.subject,
    template.networkConfirmation.body.join('<br/>')
  );
}
async function addRaftId(id) {
  let frp = path.join(networkPath, '/raft-start-template.sh');
  let fwp;

  fwp = path.join(
    networkPath,

    '/examples',
    '/7nodes',
    '/raft-start.sh'
  );

  await alter.alter_script(id, frp, fwp);
}
module.exports = { getRaftId, sendConfirmationMail, addRaftId };
