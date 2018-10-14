// catalog
let Parser = require('rss-parser');
let parser = new Parser();
let fs     = require('fs');
var level = require('level');
// var levelup = require('levelup');
// var leveldown = require('leveldown');
// var encode = require('encoding-down');

// var avito = levelup(encode(leveldown('./db/avito'), { valueEncoding: 'json' }))

var avito = level('./db', { valueEncoding: 'json' })

let avitoFeed = JSON.parse(fs.readFileSync('./config/avito.json', 'utf8'));

var count = 0;

avitoFeed.forEach( (avitoPage) => {

  (async () => {

    let feed = await parser.parseURL(avitoPage.rss);

    feed.items.forEach(item => {
      avito.put(item.id, item, function (err) {
        if (err) return console.log('Ooops!', err)

        avito.get(item.id, function (err, value) {
          if (err) return console.log('Ooops!', err)
          console.log(count++, avitoPage.page, item.id + value.title)
        })
      })

    });

  })();

});
