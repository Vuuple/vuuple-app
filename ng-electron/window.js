'use strict';
const electron = require('electron');
const windowState = require('electron-window-state');
const { is } = require('electron-util');

const { productName: title } = require('../package');
const { getApplicationMenu } = require('./menu');
const { getIconPath } = require('./utils');

const { BrowserWindow, Menu } = electron;

Object.defineProperty(exports, '__esModule', { value: true });
var path = require('path');
var url = require('url');
var win, serve;
var args = process.argv.slice(1);
serve = args.some(function(val) {
  return val === '--serve';
});
const getWindowState = () => {
  const {
    workAreaSize: {
      width: maxWidth,
      height: maxHeight,
    },
  } = electron.screen.getPrimaryDisplay();

  return windowState({
    defaultWidth: Math.min(maxWidth, 1280),
    defaultHeight: Math.min(maxHeight, 768),
  });
};
  const createWindow = async () => {
    const windowStateManager = getWindowState();
    const { x, y, width, height } = windowStateManager;

    const icon = getIconPath();
    const window = new BrowserWindow({
      title,
      icon,
      x,
      y,
      width,
      height,
      minWidth: 420,
      minHeight: 820,
      show: false,
      center: true,
      darkTheme: true,
      scrollBounce: true,
      vibrancy: 'appearance-based',
      titleBarStyle: 'hiddenInset',
      backgroundColor: '#000034',
      webPreferences: {
        webviewTag: false,
        disableBlinkFeatures: 'Auxclick'
      }
    });
    if (serve) {
      require('electron-reload')(__dirname, {
        electron: require( '../node_modules/electron')
      });
      window.loadURL('http://localhost:4200');
    } else {
      window.loadURL(
        url.format({
          pathname: path.join( '../dist/index.html'),
          protocol: 'file:',
          slashes: true
        })
      );
    }
    if (serve) {
      window.webContents.openDevTools();
    }
    window.setAutoHideMenuBar(true);
    window.setMenuBarVisibility(false);
    windowStateManager.manage(window);

    const menu = getApplicationMenu();
    Menu.setApplicationMenu(menu);

    window.on('close', event => {
      if (is.macos && !global.isQuitting && !global.isUpdating) {
        event.preventDefault();
        window.hide();
        window = null;
      }
    });

    return window;
  };

  module.exports = {
    createWindow
  };

