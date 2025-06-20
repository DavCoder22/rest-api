# Saludo Service API REST

Un microservicio RESTful de ejemplo que responde con un mensaje de saludo.

## Características

- Endpoint GET `/saludo` que devuelve un mensaje JSON
- Servidor Express.js liviano y rápido
- Configuración básica para desarrollo con nodemon

## Requisitos Previos

- Node.js (v14 o superior)
- npm (v6 o superior)

## Instalación

1. Clona el repositorio:
   ```bash
   git clone <url-del-repositorio>
   cd saludo-service
   ```

2. Instala las dependencias:
   ```bash
   npm install
   ```

## Uso

### Iniciar el servidor en modo producción:
```bash
npm start
```

### Iniciar el servidor en modo desarrollo (con recarga automática):
```bash
npm run dev
```

### Probar el endpoint:
```bash
curl http://localhost:3000/saludo
```

Deberías recibir la siguiente respuesta:
```json
{
  "mensaje": "Hola API REST"
}
```

## Estructura del Proyecto

- `index.js` - Punto de entrada de la aplicación
- `package.json` - Configuración del proyecto y dependencias

## Documentación de la API

### GET /saludo

Devuelve un mensaje de saludo en formato JSON.

**Respuesta Exitosa (200 OK):**
```json
{
  "mensaje": "Hola API REST"
}
```

## Licencia

MIT
