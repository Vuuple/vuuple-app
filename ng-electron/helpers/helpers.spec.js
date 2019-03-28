const node8 = require('./docker');
const mail = require('./mail');
const requests = require('./requests');
const path = require('path');
const template = require('../resources/mail-templates');
require('chai');

let id;
const dir = path.join(__dirname, '/resources', '/single-node/')
describe('Start the Initial Network', async () => {
  it('create init docker container', async () => {
    const filePath = path.join(dir, 'init.yml')
    await node8.start_docker(filePath);
  });

  // it('create explorer docker container', async () => {
  //   await node8.start_docker('explorer.yml');
  // });

  it('list docker containers', async () => {
    await node8.list_containers();
  });

  it('check docker containers health', async () => {
    // await node8.check_health('geth-node');
    await node8.check_status('geth-node');
  });

  // it('inspect docker containers', async () => {
  //   await node8.inspect('geth-node');
  // });
});

describe('RENTER Network', async () => {
  it('create renter docker container', async () => {
    const filePath = path.join(dir, 'renter.yml')
    await node8.start_docker(filePath);
  });

  it('list docker containers', async () => {
    await node8.list_containers();
  });

  it('check docker containers health', async () => {
    // await node8.check_health('quorum-node');
    // await node8.check_health('txManger-node');
    await node8.check_status('quorum-node');
    await node8.check_status('txManger-node');
  });

  // it('inspect docker containers', async () => {
  //   await node8.inspect('quorum-node');
  //   await node8.inspect('txManger-node');
  // });

  it('stop and remove renter docker container', async () => {
    const filePath = path.join(dir, 'renter.yml')
    await node8.stop_docker(filePath);
  });
});

describe('LENDER Network', async () => {
  it('create lender docker container', async () => {
    const filePath = path.join(dir, 'lender.yml')

    await node8.start_docker(filePath);
  });

  it('list docker containers', async () => {
    await node8.list_containers();
  });

  it('check docker containers health', async () => {
    // await node8.check_health('swarm-node');
    // await node8.check_health('quorum-node');
    // await node8.check_health('txManger-node');
    await node8.check_status('swarm-node');
    await node8.check_status('quorum-node');
    await node8.check_status('txManger-node');
  });

  // it('inspect docker containers', async () => {
  //   await node8.inspect('swarm-node');
  //   await node8.inspect('quorum-node');
  //   await node8.inspect('txManger-node');
  // });
});

describe('Joining the Network', async () => {
  it('adding raft peer', async () => {
    const endpoint = 'http://3.18.34.201:22004';
    const enode = "enode://c0d5636df2ffb3aa0c16816d3542807700cea39334a016e06479921240f64a30d3a6325c3f0e63e79b905dfb5e2929adef2c289a1c9b2a596935c86b99eae7bf@18.188.186.139:22008?discport=0&raftport=50400"; // from db
    const resObj = await requests.raft_add_peer(endpoint, enode);
    if (resObj.data.result == undefined) {
      id = null;
      console.log(resObj.data);
    }
    else {
      id = resObj.data.result;
      console.log(id);
    }
  });

  it('altering raft-start script', async () => {
    await node8.alter_script(id);
  });

  it('sending script by email', async () => {
    await mail.send_email(
      'mohamed.elghamry97@gmail.com',
      template.networkConfirmation.subject,
      template.networkConfirmation.body.join('<br/>'),
      [
        {
          filename: 'raft-start.sh',
          path: path.join(__dirname, './resources','/single-node','/examples', '/7nodes', '/raft-start.sh')
        }
      ]
    );
  });
});

describe('Stop the Network', async () => {
  it('stop and remove lender docker container', async () => {
    const filePath = path.join(dir, 'lender.yml')

    await node8.stop_docker(filePath);
  });

  it('stop and remove remaining docker containers', async () => {
    const filePath = path.join(dir, 'init.yml')

    await node8.stop_docker(filePath);
    // await node8.stop_docker('explorer.yml');
  });
});
