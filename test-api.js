const http = require('http');

// Configuración - Cambia estos valores según sea necesario
const config = {
  host: 'localhost',  // Cambia a la IP de tu EC2 cuando esté en producción
  port: 3000,
  path: '/saludo',
  method: 'GET',
  timeout: 5000  // 5 segundos de timeout
};

console.log(`\n🔍 Probando API REST en: http://${config.host}:${config.port}${config.path}\n`);

const req = http.request(config, (res) => {
  let data = '';
  
  console.log(`📡 Estado de la respuesta: ${res.statusCode} ${res.statusMessage}`);
  console.log('📋 Encabezados de respuesta:', JSON.stringify(res.headers, null, 2));
  
  res.setEncoding('utf8');
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    try {
      console.log('\n📦 Cuerpo de la respuesta:');
      console.log(JSON.stringify(JSON.parse(data), null, 2));
      
      if (res.statusCode === 200) {
        console.log('\n✅ ¡La API está funcionando correctamente!');
      } else {
        console.log('\n⚠️  La API respondió con un código de estado inesperado');
      }
    } catch (e) {
      console.log('\n📝 Respuesta (texto plano):', data);
    }
    
    console.log('\n🔚 Prueba finalizada\n');
  });
});

req.on('error', (e) => {
  console.error('\n❌ Error al conectar con la API:', e.message);
  console.log('\nPosibles soluciones:');
  console.log('1. Verifica que el servidor esté en ejecución');
  console.log('2. Comprueba que la URL sea correcta');
  console.log('3. Verifica que el puerto sea el correcto');
  console.log('4. Si estás probando en EC2, asegúrate de que el puerto 3000 esté abierto en el grupo de seguridad\n');
});

// Configurar timeout
req.on('timeout', () => {
  console.error('\n⏱️  Tiempo de espera agotado');
  req.destroy();
});

req.end();
