var respond = function(code, msg, res) {
  this.code = code;
  this.msg = msg;
  this.body = res;
};

respond.prototype.set_result = function(res) {
  this.response = res;
};
module.exports = respond;
