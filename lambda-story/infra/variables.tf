# Input variable definitions
variable "region" {
  description = "AWS region for all resources."
  type        = string
  default     = "ap-northeast-2"
}

variable "lambda_function_name" {
  description = "Value of the Name for the lambda function"
  type        = string
}

variable "s3_lambda_key" {
  description = "Lambda key to store lambda archive"
  type        = string
}

#### account access key ####
variable "access_key" {
  description = "Value of access key for IAM User"
  type        = string
}
variable "secret_key" {
  description = "Value of secret key for IAM User"
  type        = string
}

#### s3_bucket_public_access_block ####
variable "block_public_acls" {
  description = "block public acl enabled (default : false)"
  type        = bool
  default     = true
}
variable "block_public_policy" {
  description = "block public policy enabled (default : false)"
  type        = bool
  default     = true
}
variable "ignore_public_acls" {
  description = "ignore public acl enabled (default : false)"
  type        = bool
  default     = true
}
variable "restrict_public_buckets" {
  description = "restrict public bucket enabled (default : false)"
  type        = bool
  default     = true
}
