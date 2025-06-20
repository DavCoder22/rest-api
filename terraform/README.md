# Despliegue en AWS EC2 con Terraform

Este directorio contiene la configuración de Terraform para desplegar la aplicación REST API en una instancia EC2 de AWS.

## Requisitos previos

1. [Terraform](https://www.terraform.io/downloads.html) instalado (v1.0+)
2. [AWS CLI](https://aws.amazon.com/cli/) configurado con credenciales válidas
3. Un par de claves SSH en AWS (o descomenta la sección en `main.tf` para crear uno)

## Configuración

1. Copia el archivo `terraform.tfvars.example` a `terraform.tfvars` y edítalo con tus valores:
   ```bash
   cd terraform
   cp terraform.tfvars.example terraform.tfvars
   ```

2. Edita `terraform.tfvars` con tus valores:
   ```hcl
   aws_region   = "us-east-1"
   instance_type = "t2.micro"
   key_name      = "tu-par-de-claves"
   ```

## Uso

1. Inicializa Terraform:
   ```bash
   terraform init
   ```

2. Revisa los cambios que se van a realizar:
   ```bash
   terraform plan
   ```

3. Aplica los cambios para crear los recursos:
   ```bash
   terraform apply
   ```
   Confirma la acción escribiendo `yes` cuando se te solicite.

4. Una vez completado, Terraform mostrará las salidas con la URL de tu aplicación.

## Acceso a la instancia

Para conectarte por SSH a la instancia (asegúrate de tener el archivo .pem correspondiente):
```bash
ssh -i /ruta/a/tu/llave.pem ec2-user@<ip-pública>
```

## Destruir los recursos

Para eliminar todos los recursos creados y evitar cargos adicionales:
```bash
terraform destroy
```

## Estructura de archivos

- `main.tf`: Configuración principal de Terraform
- `variables.tf`: Variables de entrada
- `outputs.tf`: Salidas de la infraestructura
- `user_data.sh`: Script de inicialización de la instancia
- `terraform.tfvars`: Valores de las variables (no incluido en el control de versiones)
