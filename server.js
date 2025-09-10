const http = require('http');
const fs = require('fs');
const path = require('path');

const port = 3000;

const server = http.createServer((req, res) => {
  let filePath = path.join(__dirname, req.url === '/' ? 'index.html' : req.url);
  const ext = path.extname(filePath);

  const contentType = {
    '.html': 'text/html',
    '.css': 'text/css',
    '.js': 'text/javascript'
  }[ext] || 'text/plain';

  fs.readFile(filePath, (err, content) => {
    if (err) {
      res.writeHead(err.code === 'ENOENT' ? 404 : 500, {'Content-Type': 'text/plain'});
      res.end('Error al cargar el archivo');
    } else {
      res.writeHead(200, {'Content-Type': contentType});
      res.end(content);
    }
  });
});

server.listen(port, () => {
  console.log(`Servidor disponible en http://localhost:${port}`);
});
