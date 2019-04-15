"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var main_1 = require("./src/assets/js/main");
var win, serve;
var args = process.argv.slice(1);
serve = args.some(function (val) { return val === '--serve'; });
// const {  } = require('');
try {
    main_1.run();
}
catch (e) {
    // Catch Error
    // throw e;
}
//# sourceMappingURL=main.js.map