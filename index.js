// Importar el módulo express
const express = require('express');

// Crear una instancia de la aplicación Express
const app = express();

// Definir el puerto
const PORT = process.env.PORT || 3000;

// Middleware para parsear JSON
app.use(express.json());

// Base de datos en memoria (para el ejemplo)
let tareas = [
    { id: 1, titulo: 'Aprender Node.js', completada: false },
    { id: 2, titulo: 'Crear API REST', completada: false },
    { id: 3, titulo: 'Desplegar en EC2', completada: false }
];

// Ruta GET /saludo (para pruebas)
app.get('/saludo', (req, res) => {
    res.status(200).json({ mensaje: 'Hola API REST' });
});

// Obtener todas las tareas (GET /tareas)
app.get('/tareas', (req, res) => {
    res.status(200).json(tareas);
});

// Obtener una tarea por ID (GET /tareas/:id)
app.get('/tareas/:id', (req, res) => {
    const tarea = tareas.find(t => t.id === parseInt(req.params.id));
    if (!tarea) return res.status(404).json({ error: 'Tarea no encontrada' });
    res.status(200).json(tarea);
});

// Crear una nueva tarea (POST /tareas)
app.post('/tareas', (req, res) => {
    if (!req.body.titulo) {
        return res.status(400).json({ error: 'El título es requerido' });
    }

    const nuevaTarea = {
        id: tareas.length > 0 ? Math.max(...tareas.map(t => t.id)) + 1 : 1,
        titulo: req.body.titulo,
        completada: req.body.completada || false
    };

    tareas.push(nuevaTarea);
    res.status(201).json(nuevaTarea);
});

// Actualizar una tarea (PUT /tareas/:id)
app.put('/tareas/:id', (req, res) => {
    const tarea = tareas.find(t => t.id === parseInt(req.params.id));
    if (!tarea) return res.status(404).json({ error: 'Tarea no encontrada' });

    tarea.titulo = req.body.titulo || tarea.titulo;
    tarea.completada = req.body.completada !== undefined ? req.body.completada : tarea.completada;

    res.status(200).json(tarea);
});

// Eliminar una tarea (DELETE /tareas/:id)
app.delete('/tareas/:id', (req, res) => {
    const tareaIndex = tareas.findIndex(t => t.id === parseInt(req.params.id));
    if (tareaIndex === -1) return res.status(404).json({ error: 'Tarea no encontrada' });

    const tareaEliminada = tareas.splice(tareaIndex, 1);
    res.status(200).json({ mensaje: 'Tarea eliminada', tarea: tareaEliminada });
});

// Manejador de errores para rutas no encontradas
app.use((req, res) => {
    res.status(404).json({ error: 'Ruta no encontrada' });
});

// Iniciar el servidor
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Servidor corriendo en http://0.0.0.0:${PORT}`);
    console.log(`Prueba la ruta: http://localhost:${PORT}/saludo`);
    console.log(`API CRUD disponible en: http://localhost:${PORT}/tareas`);
});
