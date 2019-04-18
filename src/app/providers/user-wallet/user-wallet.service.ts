import { Injectable } from '@angular/core';
const keythereum = require('keythereum');
// const FileSaver = require('file-saver');
const fs = require('fs');

@Injectable({
  providedIn: 'root'
})
export class UserWalletService {
  constructor() {
    console.log('Hello UserServiceProvider Provider');
    console.log(keythereum, 'keythereum');
  }
  importKeys(address, datadir, password, cb) {
    const keyObject = keythereum.importFromFile(address, datadir);
    const privateKey = keythereum.recover(password, keyObject);
    console.log(privateKey.toString('hex'));
    keythereum.importFromFile(address, datadir).then(keyObject => {
      console.log(keyObject, 'keyObject');
      // we need to recvover the keys
    });
    //keythereum.importFromFile(address /*, datadir*/, cb);
  }
  async privateKeyToAddress(privateKey) {
    return await new Promise((resolve, reject) => {
      resolve(keythereum.privateKeyToAddress(privateKey));
    });
  }
  // 0x50b31401dd8c6bffb9d4e92a46bd51a1e3a51726
  // 46d2921a474356805972774484f747d7d75390f6aeae62a20486b02d94c9baed
  // 123
  // 04129bb92db0c32938df34fc8899e4bc211ba3342681af2889f81642c755616f

  generateKeys(cb) {
    // optional private key and initialization vector sizes in bytes
    // (if params is not passed to create, keythereum.constants is used by default)
    const params = { keyBytes: 32, ivBytes: 16 };

    // Using a Promise
    keythereum.create(params, cb);
  }
  //To recover the plaintext private key from the key object, use keythereum.recover
  async recoverKeys(password, keyObject) {
    // keythereum.recover(password, keyObject, function (privateKey) {
    // // do stuff
    // });

    console.log(password, keyObject, 'password, keyObject');

    return await new Promise((resolve, reject) => {
      keythereum.recover(password, keyObject, function(data) {
        resolve(data);
      });
    });
  }

  // it takes the item object created in generate keys functions
  exportKeys(dk, password, cb) {
    const kdf = 'pbkdf2'; // or "scrypt" to use the scrypt kdf
    const options = {
      kdf: 'pbkdf2',
      cipher: 'aes-128-ctr',
      kdfparams: {
        c: 262144,
        dklen: 32,
        prf: 'hmac-sha256'
      }
    };
    keythereum.dump(password, dk.privateKey, dk.salt, dk.iv, options, cb);
    // keythereum.dump(password, dk.privateKey, dk.salt, dk.iv, options)
    // .then(keyObject => {
    // // keyObject:
    // // {
    // // address: "008aeeda4d805471df9b2a5b0f38a0c3bcba786b",
    // // Crypto: {
    // // cipher: "aes-128-ctr",
    // // ciphertext: "5318b4d5bcd28de64ee5559e671353e16f075ecae9f99c7a79a38af5f869aa46",
    // // cipherparams: {
    // // iv: "6087dab2f9fdbbfaddc31a909735c1e6"
    // // },
    // // mac: "517ead924a9d0dc3124507e3393d175ce3ff7c1e96529c6c555ce9e51205e9b2",
    // // kdf: "pbkdf2",
    // // kdfparams: {
    // // c: 262144,
    // // dklen: 32,
    // // prf: "hmac-sha256",
    // // salt: "ae3cd4e7013836a3df6bd7241b12db061dbe2c6785853cce422d148a624ce0bd"
    // // }
    // // },
    // // id: "e13b209c-3b2f-4327-bab0-3bef2e51630d",
    // // version: 3
    // // }
    // console.log(keyObject, 'keyObject');

    // })
  }
  exportToFile(keyObject, path, cb) {
    console.log('exportToFile in service');
    const outfile = keythereum.generateKeystoreFilename(keyObject.address);
    console.log(outfile, 'outfile');
    const json = JSON.stringify(keyObject);
    console.log(json, 'json');

    //keythereum.exportToFile(keyObject, cb);
    // fs.writeFile(path, json, cb);
    console.log(path, 'path');

    fs.writeFile(path, json, 'ascii', cb);

    // FileSaver.saveAs(new Blob([json]), outfile);
  }

  buf2hex(buffer) {
    // buffer is an ArrayBuffer
    return Array.prototype.map
      .call(new Uint8Array(buffer), x => ('00' + x.toString(16)).slice(-2))
      .join('');
  }
}
