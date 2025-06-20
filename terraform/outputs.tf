output "instance_public_dns" {
  description = "DNS público de la instancia EC2"
  value       = aws_instance.app_server.public_dns
}

output "ssh_connection" {
  description = "Comando para conectarse por SSH a la instancia"
  value       = "ssh -i ${var.key_name}.pem ec2-user@${aws_instance.app_server.public_dns}"
}

output "application_status" {
  description = "URL para verificar el estado de la aplicación"
  value       = "http://${aws_instance.app_server.public_dns}:3000/saludo"
}

output "nginx_status" {
  description = "URL para verificar el estado a través de Nginx (si se configuró)"
  value       = "http://${aws_instance.app_server.public_dns}"
}
