/* eslint-env node */

const Promise = require('bluebird');
const node = require('../ng-electron/helpers/docker');

global.Promise = Promise;

const log = require('electron-log');
const unhandled = require('electron-unhandled');
const { is, appLaunchTimestamp } = require('electron-util');

log.transports.file.level = 'info';
log.transports.rendererConsole.level = 'info';

// Handle an unhandled error in the main thread
//
// Note that 'uncaughtException' is a crude mechanism for exception handling intended to
// be used only as a last resort. The event should not be used as an equivalent to
// "On Error Resume Next". Unhandled exceptions inherently mean that an application is in
// an undefined state. Attempting to resume application code without properly recovering
// from the exception can cause additional unforeseen and unpredictable issues.
//
// Attempting to resume normally after an uncaught exception can be similar to pulling out
// of the power cord when upgrading a computer -- nine out of ten times nothing happens -
// but the 10th time, the system becomes corrupted.
//
// The correct use of 'uncaughtException' is to perform synchronous cleanup of allocated
// resources (e.g. file descriptors, handles, etc) before shutting down the process. It is
// not safe to resume normal operation after 'uncaughtException'.
unhandled({
  logger(...args) {
    return log.error(...args);
  }
});

// // https://github.com/electron-archive/grunt-electron-installer#handling-squirrel-events
// if (process.platform === 'win32') {
//   // eslint-disable-next-line global-require
//   if (require('electron-squirrel-startup')) {
//     return;
//   }
// }

const path = require('path');

const prettyMs = require('pretty-ms');

const electron = require('electron');
const debug = require('electron-debug');
const contextMenu = require('electron-context-menu');

// const updateElectronApp = require('update-electron-app');

const { createWindow } = require('../window');
// const { nodeStart } = require('./ipc');

const { version, productName } = require('../package');

const { app, ipcMain, protocol } = electron;

let mainWindow = null;

const shouldQuit = !app.requestSingleInstanceLock();
if (shouldQuit) {
  app.quit();
  return;
}

app.on('second-instance', () => {
  if (mainWindow) {
    if (mainWindow.isMinimized()) {
      mainWindow.restore();
    }

    mainWindow.show();
  }
});

const basePath = is.development
  ? path.join(__dirname, '..', 'src')
  : path.join(process.resourcesPath);
global.environment = process.env;
global.dataPath = path.normalize(app.getPath('userData'));
global.resourcesPath = path.normalize(path.join(basePath, 'assets'));
global.locale = null;
global.isDataDownloaded = false;
global.isNodeStarted = false;
global.isQuitting = false;
global.isUpdating = false;
global.authorizationToken = null;

app.on('before-quit', async () => {
  // set docker-compose down
  const dockerfile = path.join(
    global.resourcesPath,
    'resources',
    'network-resources',
    'docker-compose.yml'
  );
  await node.stop_docker(dockerfile);
  global.isQuitting = true;
});

app.on('window-all-closed', async () => {
  if (!is.macos) {
    app.quit();
  }
});

app.on('activate', () => {
  if (mainWindow) {
    mainWindow.show();
  }
});

// ipcMain.on('download-start', downloadStart);
// ipcMain.on('node-start', nodeStart);

const run = async () => {
  log.info(`Starting application: ${productName} ${version} (${environment})`);
  const dockerfile = path.join(
    global.resourcesPath,
    'resources',
    'network-resources',
    'docker-compose.yml'
  );
  await node.start_docker(dockerfile);
  //need to check for containers healthy
  const child = await node.list_containers();
  // const sttus = await node.check_status(child[0]);
  const health = await node.check_health(child[0]);
  child.pop();
  console.log(child, 'child');
  // console.log(sttus, 'status');
  console.log(health, 'health');

  await app.whenReady();

  mainWindow = await createWindow();

  mainWindow.on('unresponsive', () => {
    log.warn(
      'Application window has become unresponsive:',
      mainWindow.getTitle()
    );
  });

  mainWindow.on('responsive', () => {
    log.info(
      'Application window has become responsive again:',
      mainWindow.getTitle()
    );
  });

  mainWindow.once('ready-to-show', () => {
    const elapsed = Date.now() - appLaunchTimestamp;
    log.info(
      `Application window ready to show (took ${prettyMs(elapsed)}):`,
      mainWindow.getTitle()
    );
    mainWindow.show();
  });

  mainWindow.webContents.on('crashed', () => {
    log.error('Application in window has crashed:', mainWindow.getTitle());
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });

  return mainWindow;
};

debug({ showDevTools: true });
contextMenu();

module.exports = run();
