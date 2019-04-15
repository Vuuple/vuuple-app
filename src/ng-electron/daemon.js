const os = require('os');
const net = require('net');
const path = require('path');
const node = require('../ng-electron/helpers/docker');

// const selfsigned = require('selfsigned');
// const loadJsonFile = require('load-json-file');
// const writeJsonFile = require('write-json-file');

const Promise = require('bluebird');

const electron = require('electron');
const log = require('electron-log');
// const { is } = require('electron-util');

const { app } = electron;

// const generateCert = (commonName) => {
//   const attrs = [
//     { name: 'commonName', value: commonName },
//     { name: 'countryName', value: 'US' },
//     { name: 'stateOrProvinceName', value: 'Texas' },
//     { name: 'localityName', value: 'Austin' },
//     { name: 'organizationName', value: 'Vuuple Company LLC' },
//     { name: 'organizationalUnitName', value: 'Desktop' },
//     { name: 'emailAddress', value: 'support@vuuple.com' },
//   ];

//   log.info('Generating TLS certificate:', commonName);
//   return selfsigned.generate(attrs, {
//     keySize: 2048,
//     algorithm: 'sha256',
//     extensions: [],
//   });
// };

// const getLoopbackAddress = () => new Promise((resolve, reject) => {
//   const server = net.createServer();
//   server.unref();
//   return server.listen(function Server(err) {
//     if (err) {
//       return reject(err);
//     }

//     const { address } = this.address();
//     return server.close(() => {
//       const loopback = net.isIPv6(address) ? '::1' : '127.0.0.1';
//       // const loopback = '[::1]';
//       // const loopback = '127.0.0.1';
//       log.info(loopback, 'loopback');

//       return resolve(loopback);
//     });
//   });
// });

const startDaemon = async () => {
  // start docker network
  const dockerfile = path.join(
    '/src/assets/resources/network-resources/docker-compose.yml'
  );
  await node.start_docker(dockerfile);
  // need to check for docker health if healthy return , if not await
  // const loopbackAddress = await getLoopbackAddress();
  // log.info(loopbackAddress, 'loopbackAddress');
  // let config = {};
  // try {
  //   config = await loadJsonFile(configPath);
  // } catch (err) {
  //   const env = global.environment;
  //   log.info(`Node configuration not found, generating for ${env}`);
  //   config = await loadJsonFile(path.join(__dirname, `config.${env}.json`));
  //   config.rpc.address = loopbackAddress;
  // }

  // const host = config.rpc.address;
  // log.info(host, 'host');

  // // const port = await getPort({ host, port: [config.rpc.port] });
  // // const peeringPort = await getPort({ host, port: [config.node.peering_port] });
  // const port = parseInt(config.rpc.port);
  // config.rpc.port = port;
  // config.node.logging.log_rpc = is.development;

  // const cpuCount = os.cpus().length;
  // config.node.io_threads = Math.max(2, Math.ceil(cpuCount / 2));
  // config.node.network_threads = config.node.io_threads;
  // config.node.work_threads = 2;
  // config.node.bootstrap_connections = Math.max(4, config.node.network_threads);
  // config.node.bootstrap_connections_max = Math.min(
  //   64,
  //   config.node.bootstrap_connections * 10,
  // );

  // const { version: configVersion } = config;
  // log.info(`Writing node configuration version ${configVersion}:`, configPath);
  // await writeJsonFile(configPath, config, {
  //   mode: 0o600,
  //   replacer(key, value) {
  //     return typeof value === 'object' ? value : String(value);
  //   },
  // });

  return new Promise((resolve, reject) => {
    //TODO: should return the endpint to call on the local machine or beter server object // check the original file on bcb github
    return resolve(null);
  });
};

module.exports = {
  startDaemon
};
