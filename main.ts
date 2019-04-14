import { app } from 'electron';
import { run } from './src/assets/js/main';

let win, serve;
const args = process.argv.slice(1);
serve = args.some(val => val === '--serve');

// const {  } = require('');

try {
  run();
} catch (e) {
  // Catch Error
  // throw e;
}
