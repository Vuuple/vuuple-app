
const log = require('electron-log');

const { startDaemon } = require('./daemon');




const nodeStart = ({ sender }) => {
  startDaemon()
    .then((server) => {
      server.once('close', () => {
        if (!sender.isDestroyed()) {
          sender.send('node-exit');
        }
      });

      if (!sender.isDestroyed()) {
        sender.send('node-ready');
      }
    })
    .catch((err) => {
      log.error('Error starting node:', err);
      if (!sender.isDestroyed()) {
        sender.send('node-error');
      }
    });
};

module.exports = {
  nodeStart,
};
