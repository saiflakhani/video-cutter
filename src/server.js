const { app } = require("./app");
const http = require('http').createServer(app);
var https = null;
var isHTTPS = true;
var fs = require('fs');

const $PORT = process.env.PORT || 5285;
try{
    var options = {
        key: fs.readFileSync('/etc/ssl/remolin/remolin.key'),
        cert: fs.readFileSync('/etc/ssl/remolin/www.remolin.com.crt'),
	    ca: fs.readFileSync('/etc/ssl/remolin/www.remolin.com.ca-bundle')
    };
    https = require('https').createServer(options,app);
    io = require('socket.io')(https, {
        cors: {
          origin: '*',
        }
    });
}catch(error){
    console.log("HTTPS Keys do not exist. Proceeding with HTTP");
    io = require('socket.io')(http);
    isHTTPS = false;
    console.log(error);
}

if(isHTTPS){
    https.listen($PORT, '0.0.0.0', () => {
        console.log('HTTPS listening on *:5285');
    });
}else{
    http.listen($PORT, '0.0.0.0', () => {
        console.log('listening on *:5285');
    });
}

// app.listen($PORT);