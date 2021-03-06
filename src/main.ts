import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { AppConfig } from './environments/environment';
import Web3 from 'web3';
// const networkIP = require('electron').remote.getGlobal('networkIP');
const isLocal = require('electron').remote.getGlobal('isLocal');

if (AppConfig.production) {
  enableProdMode();
}

window.addEventListener('load', function() {
  // Checking if Web3 has been injected by the browser (Mist/MetaMask)

  // use our cluster  only on develop with those who don't have geth like Ghithaa
  // window.web3 = new Web3(
  //   new Web3.providers.HttpProvider('http://3.18.34.201:22000')
  // );
  console.log(isLocal, 'isLocal');
  if (isLocal) {
    window.web3 = new Web3(
      // new Web3.providers.HttpProvider('http://3.16.57.132:22001')
      // new Web3.providers.HttpProvider('http://3.18.34.201:22000')
      new Web3.providers.HttpProvider('http://127.0.0.1:22000')
    );
  } else {
    window.web3 = new Web3(
      //  new Web3.providers.HttpProvider('http://3.16.57.132:22001')
      new Web3.providers.HttpProvider('http://3.18.34.201:22000')
      // new Web3.providers.HttpProvider('http://127.0.0.1:22000')
    );
  }

  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.log(err));
});
