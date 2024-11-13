const http = require('http');
const url = require('url');

// Lista de comentarios almacenados en memoria
let comments = [
    { id: 1, content: "Este es el primer comentario." },
    { id: 2, content: "Este es el segundo comentario." }
];

// Función para manejar las solicitudes
const requestHandler = (req, res) => {
    const parsedUrl = url.parse(req.url, true);
    
    // Manejar solicitudes GET para obtener comentarios
    if (parsedUrl.pathname === '/comments' && req.method === 'GET') {
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify(comments));
    }
    // Manejar solicitudes POST para agregar un nuevo comentario
    else if (parsedUrl.pathname === '/comments' && req.method === 'POST') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            const newComment = JSON.parse(body);
            newComment.id = comments.length + 1;
            comments.push(newComment);
            res.writeHead(201, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify(newComment));
        });
    } 
    // Manejar otras rutas
    else {
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('Ruta no encontrada');
    }
};

// Crear el servidor HTTP
const server = http.createServer(requestHandler);

// Escuchar en el puerto 3000
const PORT = 3000;
server.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});
