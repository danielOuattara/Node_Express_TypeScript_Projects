
import * as http from 'node:http';
import { readFileSync } from 'fs';

const homePage: Buffer = readFileSync('./dist/index.html');

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


