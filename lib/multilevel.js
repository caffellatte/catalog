var multilevel = require('multilevel');
var net = require('net');
var level = require('level');

var avito = level('./db/avito');

net.createServer(function (con) {
  con.pipe(multilevel.server(avito)).pipe(con);
}).listen(3000);

avito.put('foo', 'bar', function (err) {
  if (err) throw err;
});
