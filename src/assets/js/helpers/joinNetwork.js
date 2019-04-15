const requests = require('./requests');
const alter = require('./alter');
const getNodeKey = require('./getNodeKey');
const mailer = require('./mail');

async function getRaftId(ip, endpoint, category) {
  const nodeKey = await getNodeKey();

  // const endpoint = 'http://3.18.34.201:22004';
  const enode = `enode://${nodeKey}@${ip}:22008?discport=0&raftport=50400`; // from db
  const resObj = await requests.raft_add_peer(endpoint, enode);
  let id;
  if (resObj.data.result == undefined) {
    id = null;
    console.log(resObj.data);
  } else {
    id = resObj.data.result;
    console.log(id);
  }
  let frp = path.join(
    __dirname,
    '..',
    '/..',
    '/src',
    '/assets',
    '/resources',
    '/mail-resources',
    '/raft-start-template.sh'
  );
  let fwp;
  if (category == 'lender') {
    fwp = path.join(
      __dirname,
      '..',
      '/..',
      '/src',
      '/assets',
      '/resources',
      '/mail-resources',
      '/network-resources',
      '/examples',
      '/7nodes',
      '/raft-start.sh'
    );
  } else if (category == 'renter') {
    fwp = path.join(
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
      '/raft-start.sh'
    );
  }

  await alter.alter_script(id, frp, fwp);
  return { id, enode };
}
async function sendConfirmationMail(to) {
  //TODO: zip the folder and send it
  // send
  const attach = path.join(
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
    '/raft-start.sh'
  );
  return await mailer.send_email(
    to,
    '"Vuuple App" <support@vuuple.com>',
    template.networkConfirmation.subject,
    template.networkConfirmation.body.join('<br/>'),
    [
      {
        filename: 'Vuuple Network Scripts',
        path: attach
      }
    ]
  );
}

module.exports = { getRaftId, sendConfirmationMail };
