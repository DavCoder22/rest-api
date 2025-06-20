#!/bin/bash
# Actualizar el sistema
yum update -y

# Instalar Node.js 16.x y NPM
curl -sL https://rpm.nodesource.com/setup_16.x | sudo bash -
yum install -y nodejs

# Instalar Git
yum install -y git

# Instalar PM2 globalmente para manejar la aplicación
npm install -g pm2

# Clonar el repositorio de la aplicación
cd /home/ec2-user
git clone ${github_repo} app
cd app

# Instalar dependencias de la aplicación
npm install

# Iniciar la aplicación con PM2
pm2 start index.js --name "rest-api"

# Configurar PM2 para que se inicie automáticamente
pm2 startup
pm2 save

# Configurar Nginx como proxy inverso (opcional pero recomendado)
yum install -y nginx

cat > /etc/nginx/conf.d/rest-api.conf <<EOL
server {
    listen 80;
    server_name _;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade \$http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host \$host;
        proxy_cache_bypass \$http_upgrade;
    }
}
EOL

# Iniciar y habilitar Nginx
systemctl start nginx
systemctl enable nginx

# Configurar el firewall
systemctl start firewalld
systemctl enable firewalld
firewall-cmd --zone=public --add-service=http --permanent
firewall-cmd --zone=public --add-service=https --permanent
firewall-cmd --reload
