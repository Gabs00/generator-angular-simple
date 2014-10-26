var app = require('express')();
var server = require('http').Server(app);
var config = require('./config/config');

app.get('/*', function(req, res, next){
  var url = req.url;
  console.log('/GET', req.url);
  //Checking for urls like ../../passwd etc
  if(!url.match(/\.\.+?\//)){
    res.sendFile(req.url, {root:'./client'});
  } else if(url === '/'){
    next();
  } else {
    res.status(405).send('Did you try something naughty?');
  }
});

app.get('/', function(req, res){
  res.sendFile('index.html', {root:'./client'});
});

//Config checks process.env, otherwise sets to 9000
var port = config.port;

module.exports.listen = function(){
  server.listen(port, function(){
    console.log('Server listening on port', port);
  })
};