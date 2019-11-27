import { Injectable } from '@angular/core';
import * as contract from 'truffle-contract';
declare let require: any;
import Web3 from 'web3';
const Tx = require('ethereumjs-tx');

const RenterFactory = require('../../../contracts/RenterFactory.json');
declare global {
  interface Window {
    web3: any;
  }
}
window.web3 = window.web3 || {};

@Injectable()
export class RenterFactoryService {
  private web3: any;
  private accounts: string[];
  account;
  public ready = false;
  renterFactory = contract(RenterFactory);
  status: string;

  constructor() {
    Web3.providers.HttpProvider.prototype.sendAsync =
      Web3.providers.HttpProvider.prototype.send;
    this.web3 = window.web3;
    console.log(this.web3, ' this.web3');

    this.onReady();
  }

  onReady() {
    // Bootstrap the IdentityManager abstraction for Use.
    this.renterFactory.setProvider(this.web3.currentProvider);

    this.getCurrentAccount();
  }

  async getCurrentAccount() {
    this.accounts = await this.web3.eth.getAccounts();
    if (this.accounts.length === 0) {
      alert(
        `Couldn't get any accounts! Make sure your Ethereum client is configured correctly.`
      );
      return;
    }

    this.account = this.accounts[0];
    // return this.account;
    return '0xed9d02e382b34818e88b88a309c7fe71e65f419d';

  }

  getCurrentProvider() {
    return this.web3.currentProvider;
  }

  setStatus(message: string) {
    this.status = message;
  }

  /**
   * Setter functions
   */
  async renterRegister(type) {
    const result = await this.renterFactory
      .deployed()
      .then(instance => {
        console.log('instance', instance);

        return instance.renterRegister(type, {
          from: this.account,
          gas: 5000000 //200000
        });
      })
      .then(res => {
        this.setStatus('renterRegister complete!');
        return res;
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error in renterRegister; see log.');
      });
    return result;
  }

  sendSigned(txData, _privKey, cb) {
    const privateKey = new Buffer(_privKey, 'hex');
    const transaction = new Tx(txData);
    transaction.sign(privateKey);
    console.log(transaction, 'transaction sign(privateKey)');

    const serializedTx = transaction.serialize().toString('hex');
    // web3.eth.sendRawTransaction('0x' + serializedTx, cb);
    this.web3.eth.sendSignedTransaction('0x' + serializedTx, cb);
  }
  async renterRegisterSigned(type, userPK, _privKey, gas) {
    const promise = await new Promise((resolve, reject) => {
      let self = this;
      this.renterFactory.deployed().then(async instance => {
        // meta = instance;
        let nonce;
        console.log(instance, 'instance');

        // get target function
        const targetFunction = instance.renterRegister.request(type).params[0];

        console.log(targetFunction, 'targetFunction');

        self.web3.eth.getTransactionCount(userPK, function(error, result) {
          nonce = result.toString(16);
          console.log(result, 'nonce');

          console.log('Nonce: ' + nonce);
          const txParams = {
            // gasPrice: 2000000000,
            // gasLimit: 3000000,
            // gas: estimatedGas,
            gas: gas,
            gasPrice: 0,
            to: targetFunction.to,
            data: targetFunction.data,
            from: userPK,

            nonce: '0x' + nonce
          };

          console.log(txParams, 'txParams');

          return self.sendSigned(txParams, _privKey, function(err, hash) {
            console.log(err, 'err');
            console.log(hash, 'hash');
            resolve(hash);
          });
        });
      });
    })
      .then(rs => {
        console.log('rs', rs);
        return rs;
      })
      .catch(e => {
        console.log(e);
      });
    return promise;
  }
  /**
   * Getter functions
   */
  async getRenterContract(renterAddress) {
    console.log('getRenterContract');
    const result = await this.renterFactory
      .deployed()
      .then(instance => {
        //
        console.log('instance', instance);

        return instance.getRenterContract.call(renterAddress);
      })
      .then(rs => {
        console.log('rs', rs);
        this.setStatus('getRenterContract complete!');

        return rs;
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error in getRenterContract; see log.');
      });
    return result;
  }

  async getVuupleAdmin() {
    console.log('getVuupleAdmin');
    const result = await this.renterFactory
      .deployed()
      .then(instance => {
        //
        console.log('instance', instance);

        return instance.vuupleAdmin.call();
      })
      .then(rs => {
        console.log('rs', rs);
        this.setStatus('getVuupleAdmin complete!');

        return rs;
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error in getVuupleAdmin; see log.');
      });
    return result;
  }

  async getVuupleToken() {
    console.log('getVuupleToken');
    const result = await this.renterFactory
      .deployed()
      .then(instance => {
        //
        console.log('instance', instance);

        return instance.vuupleToken.call();
      })
      .then(rs => {
        console.log('rs', rs);
        this.setStatus('getVuupleToken complete!');

        return rs;
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error in getVuupleToken; see log.');
      });
    return result;
  }

  async getRenterIndex() {
    console.log('getRenterIndex');
    const result = await this.renterFactory
      .deployed()
      .then(instance => {
        //
        console.log('instance', instance);

        return instance.renterIndex.call();
      })
      .then(rs => {
        // console.log('rs', rs);
        this.setStatus('getRenterIndex complete!');

        return rs.toNumber();
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error in getRenterIndex; see log.');
      });
    return result;
  }
}
