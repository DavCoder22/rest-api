provider "aws" {
  region = var.aws_region
}

# Obtener la AMI más reciente de Amazon Linux 2
data "aws_ami" "amazon_linux_2" {
  most_recent = true
  owners      = ["amazon"]

  filter {
    name   = "name"
    values = ["amzn2-ami-hvm-*-x86_64-gp2"]
  }
}

# Crear un par de claves SSH
resource "tls_private_key" "this" {
  algorithm = "RSA"
  rsa_bits  = 4096
}

resource "aws_key_pair" "generated_key" {
  key_name   = var.key_name
  public_key = tls_private_key.this.public_key_openssh
}

resource "local_file" "private_key" {
  content  = tls_private_key.this.private_key_pem
  filename = "${path.module}/ec2-key.pem"
  file_permission = "0400"
}

# Crear un grupo de seguridad
resource "aws_security_group" "app_sg" {
  name        = "rest-api-sg"
  description = "Security group for REST API"

  # SSH access
  ingress {
    from_port   = 22
    to_port     = 22
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # HTTP access
  ingress {
    from_port   = 80
    to_port     = 80
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Puerto de la aplicación
  ingress {
    from_port   = 3000
    to_port     = 3000
    protocol    = "tcp"
    cidr_blocks = ["0.0.0.0/0"]
  }

  # Outbound internet access
  egress {
    from_port   = 0
    to_port     = 0
    protocol    = "-1"
    cidr_blocks = ["0.0.0.0/0"]
  }

  tags = {
    Name = "rest-api-sg"
  }
}

# Script de inicialización para la instancia EC2
data "template_file" "user_data" {
  template = file("${path.module}/user_data.sh")
  vars = {
    github_repo = var.github_repo
  }
}

# Crear la instancia EC2
resource "aws_instance" "app_server" {
  ami           = data.aws_ami.amazon_linux_2.id
  instance_type = var.instance_type
  key_name      = aws_key_pair.generated_key.key_name
  vpc_security_group_ids = [aws_security_group.app_sg.id]

  user_data = data.template_file.user_data.rendered

  tags = {
    Name = "rest-api-server"
  }

  # Asegurarse de que la instancia tenga una IP pública
  associate_public_ip_address = true
}

# Mostrar la IP pública de la instancia
output "instance_public_ip" {
  description = "IP pública de la instancia EC2"
  value       = aws_instance.app_server.public_ip
}

output "application_url" {
  description = "URL de la aplicación"
  value       = "http://${aws_instance.app_server.public_ip}:3000"
}
