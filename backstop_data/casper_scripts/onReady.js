var USERNAME = 'USERNAME';
var PASSWORD = 'PASSWORD';
// var TAGS = {'240sx', 'drifting'};

module.exports = function(casper, scenario, vp) {
  login();


};

var login = function(){
  casper.fillSelectors('form', {
    'input[name = username]': USERNAME,
    'input[name = password]': PASSWORD
  }, true)
  casper.wait(200);
  casper.click('form button');
  casper.wait(500);
}
