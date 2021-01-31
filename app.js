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


app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));
});

app.get('/home', function(req, res) {
    res.sendFile(path.join(__dirname + '/public/home/index.html'));
});

app.listen(3000, () => {
    console.log(`Server hosting at: http://localhost:3000`)
});