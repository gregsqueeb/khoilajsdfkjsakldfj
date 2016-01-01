module.exports = function(casper, scenario, vp) {

  // for each tag, search the term, and then like all the photos on the page
  // for ( tag in TAGS ){
  //   search("#"+TAGS[tag], likePhotos);
  // }
  likePhotos();
};

function likePhotos(){

  // Get all Links to the pictures
  casper.getElementsInfo('a').map(function(info){

    var randomNum = Math.floor((Math.random() * 1000) + 1000);
    // Only click it if it is an image, images have a url like /p/123456
    casper.wait(randomNum, function(){
      if(info.attributes.href.indexOf('/p/') > -1){

        // Click one of the images to get the picture modal to come up
        casper.click('a[href = "' + info.attributes.href + '" ]');

        randomNum = Math.floor((Math.random() * 2000) + 500);
        // When the modal is up, click the like button if it has not been liked already
        casper.wait(randomNum, function(){
          if(casper.exists('.coreSpriteHeartOpen')){
            randomNum = Math.floor((Math.random() * 1000) + 500);
            casper.wait(randomNum, function(){
              casper.click('.coreSpriteHeartOpen');
              console.log("Clicking like button")
            });
          }

          randomNum = Math.floor((Math.random() * 500) + 500);
          // Click the modal background to close the modal
          casper.wait(randomNum, function(){
            if(casper.exists('div[role="dialog"]')){
              casper.click('div[role="dialog"]');
            }
          });

        });
      }
    });
  });
};


function search(tag, likePhotos){

  //click the search box at the top of the page
  casper.click('input[placeholder = Search]');

  // type in the tag
  casper.sendKeys('input[placeholder = Search]', ""+tag);

  // Press enter key
  casper.wait(500, function(){
    casper.sendKeys('input[placeholder = Search]', casper.page.event.key.Enter);
  });

  // Output Title of the page
  console.log('On page ' + casper.getTitle());

  // The page is now the correct tag, so like the photos
  likePhotos();
};
