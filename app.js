const clientID = "d0d8d623fec94fceb189a1a6bd05eff4";

const livereload = require("livereload");
const path = require('path');
const connectLivereload = require("connect-livereload");
const express = require('express')

const liveReloadServer = livereload.createServer();

const app = express();

app.use(connectLivereload());
liveReloadServer.watch(path.join(__dirname, '/'))

liveReloadServer.server.once("connection", () => {
    setTimeout(() => {
      liveReloadServer.refresh("/");
    }, 100);
});
// imports
app.use('/ness', express.static(__dirname + '/node_modules/nes.css/css/'));
app.use('/css', express.static(__dirname + '/public/css/'));


// routes
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/home', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/home/index.html'));
});

app.get('/login', function(req, res) {
    var scopes = 'user-read-private user-read-email';
    var redirect_uri = 'http://localhost:3000/home';
    console.log(res)
    res.redirect('https://accounts.spotify.com/authorize' +
      '?response_type=code' +
      '&client_id=' + clientID +
      (scopes ? '&scope=' + encodeURIComponent(scopes) : '') +
      '&redirect_uri=' + encodeURIComponent(redirect_uri));
});


app.listen(3000, () => {
    console.log(`Server hosting at: http://localhost:3000`)
});