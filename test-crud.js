const http = require('http');

const config = {
  host: '34.239.144.185',  // IP de tu instancia EC2
  port: 3000,
  headers: {
    'Content-Type': 'application/json'
  }
};

// Función auxiliar para hacer peticiones HTTP
function hacerPeticion(opciones, datos = null) {
  return new Promise((resolve, reject) => {
    const req = http.request({
      ...config,
      ...opciones,
      path: opciones.path
    }, (res) => {
      let data = '';
      
      res.on('data', (chunk) => {
        data += chunk;
      });
      
      res.on('end', () => {
        try {
          const resultado = data ? JSON.parse(data) : {};
          console.log(`\n🔵 ${opciones.method} ${opciones.path} - ${res.statusCode} ${res.statusMessage}`);
          console.log(JSON.stringify(resultado, null, 2));
          resolve(resultado);
        } catch (e) {
          reject(e);
        }
      });
    });

    req.on('error', (e) => {
      console.error(`\n❌ Error en la petición: ${e.message}`);
      reject(e);
    });

    if (datos) {
      req.write(JSON.stringify(datos));
    }
    
    req.end();
  });
}

// Ejecutar pruebas CRUD
async function probarCRUD() {
  try {
    console.log('🚀 Iniciando pruebas CRUD\n');
    
    // 1. Obtener todas las tareas (GET /tareas)
    console.log('1. Obteniendo todas las tareas...');
    await hacerPeticion({
      method: 'GET',
      path: '/tareas'
    });

    // 2. Crear una nueva tarea (POST /tareas)
    console.log('\n2. Creando una nueva tarea...');
    const nuevaTarea = await hacerPeticion({
      method: 'POST',
      path: '/tareas'
    }, {
      titulo: 'Nueva tarea desde el script',
      completada: false
    });

    const tareaId = nuevaTarea.id;

    // 3. Obtener una tarea por ID (GET /tareas/:id)
    console.log(`\n3. Obteniendo tarea con ID ${tareaId}...`);
    await hacerPeticion({
      method: 'GET',
      path: `/tareas/${tareaId}`
    });

    // 4. Actualizar la tarea (PUT /tareas/:id)
    console.log('\n4. Actualizando la tarea...');
    await hacerPeticion({
      method: 'PUT',
      path: `/tareas/${tareaId}`
    }, {
      titulo: 'Tarea actualizada',
      completada: true
    });

    // 5. Verificar la actualización (GET /tareas/:id)
    console.log('\n5. Verificando la actualización...');
    await hacerPeticion({
      method: 'GET',
      path: `/tareas/${tareaId}`
    });

    // 6. Eliminar la tarea (DELETE /tareas/:id)
    console.log('\n6. Eliminando la tarea...');
    await hacerPeticion({
      method: 'DELETE',
      path: `/tareas/${tareaId}`
    });

    // 7. Verificar que la tarea fue eliminada (GET /tareas)
    console.log('\n7. Verificando que la tarea fue eliminada...');
    await hacerPeticion({
      method: 'GET',
      path: '/tareas'
    });

    console.log('\n✅ Pruebas CRUD completadas exitosamente!');
  } catch (error) {
    console.error('\n❌ Error durante las pruebas:', error);
  }
}

// Ejecutar las pruebas
probarCRUD();
