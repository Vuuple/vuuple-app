import BzzAPI from '@erebos/api-bzz-node';

async function upload(gateway, raw, options) {
  const bzz = new BzzAPI({ url: gateway });

  return await bzz.upload(raw, options);
}
async function uploadFileFrom(gateway, path, options) {
  const bzz = new BzzAPI({ url: gateway });

  return await bzz.uploadFileFrom(path, options);
}
async function uploadFile(gateway, file, options) {
  const bzz = new BzzAPI({ url: gateway });

  return await bzz.uploadFile(file, options);
}
async function download(gateway, hash, options) {
  const bzz = new BzzAPI({ url: gateway });

  return await bzz.download(hash, options);
}
async function downloadFileTo(gateway, hash, path, options) {
  const bzz = new BzzAPI({ url: gateway });

  return await bzz.downloadFileTo(hash, path, options);
}
async function downloadDirectoryData(gateway, hash, options) {
  const bzz = new BzzAPI({ url: gateway });

  return await bzz.downloadDirectoryData(hash, options);
}

async function getUrl(gateway, hash, options) {
  const bzz = new BzzAPI({ url: gateway });
  const data = await bzz.getDownloadURL(hash, options);
  console.log(data, 'data');

  return data;
}
async function getContent(gateway, hash, options) {
  const data = await download(gateway, hash, options);
  const text = await data.text();
  return text;
}
async function getManifest(gateway, hash, options) {
  const bzz = new BzzAPI({ url: gateway });
  const data = await bzz.list(hash, options);
  return data;
}
module.exports = {
  upload,
  getUrl,
  getContent,
  uploadFileFrom,
  uploadFile,
  downloadFileTo,
  downloadDirectoryData,
  getManifest
};
