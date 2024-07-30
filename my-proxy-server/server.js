const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();

const API_SERVICE_URL = "https://api2.arduino.cc";

// Middleware para manejar CORS
app.use(cors());
app.use((req, res, next) => {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT,DELETE,PATCH");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    if (req.method === 'OPTIONS') {
        res.sendStatus(200);
    } else {
        next();
    }
});

// Configura el middleware del proxy
app.use('/api', createProxyMiddleware({
    target: API_SERVICE_URL,  // URL del servidor de destino
    changeOrigin: true,       // Cambia el origen del host para el servidor de destino
    pathRewrite: {
        '^/api': '',          // Reescribe la ruta eliminando el prefijo /api
    },
    onProxyReq: (proxyReq, req, res) => {
        // Agrega headers personalizados si es necesario
        proxyReq.setHeader('Origin', API_SERVICE_URL);
    },
    onError: (err, req, res) => {
        console.error('Proxy error:', err);
        res.status(500).send('Proxy error');
    }
}));

// Ruta de prueba para la raíz "/"
app.get('/', (req, res) => {
    res.send('Servidor proxy está funcionando');
});

// Inicia el servidor en el puerto 3000
app.listen(3000, () => {
    console.log('Proxy server is running on http://localhost:3000');
});
