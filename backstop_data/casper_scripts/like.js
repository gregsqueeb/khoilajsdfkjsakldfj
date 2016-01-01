var TAGS = ['240sx', 'drifting'];

module.exports = function(casper, scenario, vp) {

  for ( tag in TAGS ){
    search("#"+TAGS[tag]);
    like();
  }
  // console.log(casper.getHTML('#react-root'));

  // casper.click('.coreSpriteHeartOpen');
};

function search(tag){
  // casper.fillSelectors('form', {
  //   'input[placeholder = Search]': tag
  // }, true)
  casper.click('input[placeholder = Search]');
  casper.sendKeys('input[placeholder = Search]', ""+tag);
  casper.wait(500, function(){
    casper.sendKeys('input[placeholder = Search]', casper.page.event.key.Enter);
  });
  // console.log(casper.getHTML('body'));
  // document.querySelector("input[placeholder='Search']");
  // casper.sendKeys('input[placeholder = Search]', casper.page.event.key.Enter, {keepFocus: true});
}
function like(){
  casper.getElementsInfo('a').map(function(info){
    // Only click it if it is an image
    casper.wait(500, function(){
      if(info.attributes.href.indexOf('/p/') > -1){
        // console.log(JSON.stringify(info, null, 4))
        casper.click('a[href = "' + info.attributes.href + '" ]');
        // When the modal is up, click the like button if it has not been liked already
        casper.wait(500, function(){
          if(casper.exists('.coreSpriteHeartOpen')){
            console.log("There is a heart to click")
            casper.wait(500, function(){
              // console.log(casper.getHTML('.coreSpriteHeartOpen'));
              casper.click('.coreSpriteHeartOpen');
              casper.wait(500, function(){
                // console.log(casper.getHTML('div[role="dialog"]'));
                if(casper.exists('div[role="dialog"]')){
                  casper.click('div[role="dialog"]');
                }
              });
            });
          }
        });
      }
    });
  });
}
