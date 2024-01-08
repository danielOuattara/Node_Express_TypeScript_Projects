
import * as http from 'node:http';
import { readFileSync } from 'fs';

const homePage: Buffer = readFileSync('./dist/index.html');
const homeStyles: Buffer = readFileSync('./dist/styles.css');
const homeImage: Buffer = readFileSync('./dist/logo.svg');
const homeLogic: Buffer = readFileSync('./dist/browser-app.js');

const server = http.createServer((req: http.IncomingMessage, res: http.ServerResponse) => {
    const url: string | undefined = req.url;
    console.log(req.url);

    // home page
    if (url === '/') {
        res.writeHead(200, { 'content-type': 'text/html' });
        res.write(homePage);
        res.end();
    }
    // about page
    else if (url === '/about') {
        res.writeHead(200, { 'content-type': 'text/html' });
        res.write('<h1>About page</h1>');
        res.end();
    }

      // style
  else if (url === "/styles.css") {
    res.writeHead(200, { "content-type": "text/css" });
    res.write(homeStyles);
    res.end();
  }

  // logo
  else if (url === "/logo.svg") {
    res.writeHead(200, { "content-type": "image/svg+xml" });
    res.write(homeImage);
    res.end();
  }

  // javascript logic
  else if (url === "/browser-app.js") {
    res.writeHead(200, { "content-type": "text/javascript" });
    res.write(homeLogic);
    res.end();
  }
  
    // 404
    else {
        res.writeHead(404, { 'content-type': 'text/html' });
        res.write('<h1> 404... page not found :-(</h1>');
        res.end();
    }
});

server.listen(5000, () => {
    console.log('Server running on port 5000');
});


