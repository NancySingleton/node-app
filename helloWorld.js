const http = require('http');
const fs = require('fs');

const serveStaticFile = (res, path, contentType, responseCode) => {
    if (!responseCode) responseCode = 200; 

    const handleOpenFile = (err, data) => {
        if (err) {
            res.writeHead(500, { 'Content-Type': 'text/plain' }); 
            res.end('500 - Internal Error');
            return;
        }    
        res.writeHead(responseCode, { 'Content-Type': contentType });
        res.end(data);
    }

    fs.readFile(__dirname + path, handleOpenFile);
}

const handle = (req, res) => {
    var path = req.url.replace(/\/?(?:\?.*)?$/, '').toLowerCase(); 
    
    switch (path) {
        case '':
            serveStaticFile(res, '/public/home.html', 'text/html'); 
            break;
        case '/about':
            serveStaticFile(res, '/public/about.html', 'text/html'); 
            break;
        case '/img/logo.jpg':
            serveStaticFile(res, '/public/img/logo.jpg', 'image/jpeg'); 
            break;
        default:
            serveStaticFile(res, '/public/404.html', 'text/html', 404); 
            break;
        }
}

http.createServer(handle).listen(3000);
console.log('Server started on localhost:3000; press Ctrl-C to terminate....');