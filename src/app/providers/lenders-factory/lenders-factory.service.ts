import { Injectable } from '@angular/core';
import * as contract from 'truffle-contract';
import Web3 from 'web3';
const Tx = require('ethereumjs-tx');

const LenderFactory = require('../../../contracts/LenderFactory.json');

declare let require: any;
declare global {
  interface Window {
    web3: any;
  }
}
window.web3 = window.web3 || {};

@Injectable()
export class LendersFactoryService {
  private web3: any;
  private accounts: string[];
  account;
  public ready = false;
  lenderFactory = contract(LenderFactory);
  status: string;

  constructor() {
    Web3.providers.HttpProvider.prototype.sendAsync =
      Web3.providers.HttpProvider.prototype.send;
    this.web3 = window.web3;
    console.log(this.web3.version);
    this.onReady();
  }

  /**
   * General functions
   */
  onReady() {
    // Bootstrap the IdentityManager abstraction for Use.
    this.lenderFactory.setProvider(this.web3.currentProvider);

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
    return this.account;
  }

  getCurrentProvider() {
    return this.web3.currentProvider;
  }

  setStatus(message: string) {
    this.status = message;
  }
  test() {
    return 'Lender Factory Called Successfully';
  }

  /**
   * Setter functions
   */
  async lenderRegister(rentedStorage, lender) {
    const result = await this.lenderFactory
      .deployed()
      .then(instance => {
        console.log('instance', instance);

        return instance.lenderRegister(rentedStorage, {
          from: lender,
          gas: 4982886
        });
      })
      .then(res => {
        this.setStatus('Transaction complete!');
        return res;
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error ; see log.');
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
  async lenderRegisterSigned(rentedStorage, userPK, _privKey, gas) {
    const promise = await new Promise((resolve, reject) => {
      let self = this;
      this.lenderFactory.deployed().then(async instance => {
        // meta = instance;
        let nonce;
        console.log(instance, 'instance');

        // get target function
        const targetFunction = instance.lenderRegister.request(rentedStorage)
          .params[0];

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

  // internal function
  // async _addToMinerRole(contractAddress) {
  //   const result = await this.lenderFactory
  //     .deployed()
  //     .then(instance => {
  //       console.log('instance', instance);
  //
  //       return instance._addToMinerRole(contractAddress);
  //     })
  //     .then(res => {
  //       this.setStatus('Transaction complete!');
  //       return res;
  //     })
  //     .catch(e => {
  //       console.log(e);
  //       this.setStatus('Error ; see log.');
  //     });
  //   return result;
  // }

  /**
   * Getter functions
   */
  async getLenderContract(lenderAddress) {
    const result = await this.lenderFactory
      .deployed()
      .then(instance => {
        //
        console.log('instance', instance);

        return instance.getLenderContract.call(lenderAddress);
      })
      .then(rs => {
        console.log('rs', rs);
        this.setStatus('Transaction complete!');

        return rs;
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error ; see log.');
      });
    return result;
  }

  async lenderIndex() {
    const result = await this.lenderFactory
      .deployed()
      .then(instance => {
        return instance.lenderIndex.call();
      })
      .then(rs => {
        this.setStatus('Transaction complete!');

        return rs.toNumber();
      })
      .catch(e => {
        console.log(e);
        this.setStatus('Error ; see log.');
      });
    return result;
  }

  /**
   * Event functions
   * No Events
   */
}
