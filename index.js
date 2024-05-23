const http = require('http');
const https = require('https');
const express = require('express');
const fs = require('fs');

const app = express();
const HTTP_PORT = 3709; // Porta para requisições HTTP
const HTTPS_PORT = 3708; // Porta para requisições HTTPS

// Caminhos para os arquivos de certificado e chave privada
const certFilePath = '/etc/letsencrypt/live/etc/fullchain.pem';
const keyFilePath = '/etc/letsencrypt/live/etc/privkey.pem';

// Carregar certificados SSL
const privateKey = fs.readFileSync(keyFilePath, 'utf8');
const certificate = fs.readFileSync(certFilePath, 'utf8');
const credentials = { key: privateKey, cert: certificate };

// Middleware de exemplo
app.use(express.json());

// Rota GET de exemplo
app.get('/hello', (req, res) => {
    res.send('Olá, mundo!');
});

// Servidor HTTP
const httpServer = http.createServer(app);
httpServer.listen(HTTP_PORT, () => {
    console.log(`Servidor HTTP iniciado na porta ${HTTP_PORT}`);
});

// Servidor HTTPS
const httpsServer = https.createServer(credentials, app);
httpsServer.listen(HTTPS_PORT, () => {
    console.log(`Servidor HTTPS iniciado na porta ${HTTPS_PORT}`);
});
