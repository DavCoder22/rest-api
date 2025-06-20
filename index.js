// Importar el módulo express
const express = require('express');

// Crear una instancia de la aplicación Express
const app = express();

// Definir el puerto
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Ruta GET /saludo
app.get('/saludo', (req, res) => {
    res.status(200).json({ mensaje: 'Hola API REST' });
});

// Manejador de errores para rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

// Iniciar el servidor
app.listen(PORT, () => {
    console.log(`Servidor corriendo en http://localhost:${PORT}`);
    console.log(`Prueba la ruta: http://localhost:${PORT}/saludo`);
});
