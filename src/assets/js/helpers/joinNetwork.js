const requests = require('./requests');
const alter = require('./alter');
const mailer = require('./mail');
const networkPath = require('electron').remote.getGlobal('networkPath');
const template = require('../../resources/mail-resources/mail-templates.json');

async function getRaftId(ip, endpoint, enode) {
  // const endpoint = 'http://3.18.34.201:22004';
  //   "enode://6407bfc4d754aae5b9957b9303acf3fc64a3d08afb6fe4acfa955ab90b628e442cafae6b67bdba1d74e57e13aa6a3131c436ad45d4d9cdbf6be78f59da5a6b5d@3.17.185.195:21000?discport=30301&raftport=50400"

  // const enode = `enode://0c12df9da5b30947a16ba9e8aa8a426123dbe7494c8a3080d341ac728a99317bbb75cc6a8bccfe1be17fcdd1469fa087f02488750eb6251c3f4ea6263ad44d06@192.168.0.103:22000?discport=0&raftport=50400`; // from db
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
