// https://github.com/marcbachmann/node-html-pdf/issues/35
// http://phantomjs.org/build.html
// https://github.com/amir20/phantomjs-node/issues/649
// https://github.com/amir20/phantomjs-node/issues/475

const phantom = require('phantom');


var pageNumber = 1;
var feedUrl = '';
(async function() {
  const instance = await phantom.create();
  const page = await instance.createPage();
  await page.on('onResourceRequested', function(requestData) {
    console.info('Requesting', requestData.url);
  });

  const status = await page.open(feedUrl);
  const content = await page.property('content');
  console.log(content);

  await instance.exit();
})();
