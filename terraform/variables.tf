variable "aws_region" {
  description = "Región de AWS donde se desplegarán los recursos"
  type        = string
  default     = "us-east-1"
}

variable "instance_type" {
  description = "Tipo de instancia EC2"
  type        = string
  default     = "t2.micro"
}

variable "key_name" {
  description = "Nombre del par de claves SSH existente en AWS"
  type        = string
  default     = "tu-par-de-claves"
}

variable "github_repo" {
  description = "URL del repositorio de GitHub"
  type        = string
  default     = "https://github.com/DavCoder22/rest-api.git"
}
