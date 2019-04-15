const path = require('path');
const { is } = require('electron-util');
console.log(global.resourcesPath,'global.resourcesPath');

const getIconExtension = () => (is.windows ? '.ico' : '.png');

const getIconPath = (ext = getIconExtension()) => path.format({
  ext,
  name: 'icon',
  dir: global.resourcesPath,
});

module.exports = {
  getIconPath,
};
