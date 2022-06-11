provider "aws" {
  profile                  = "terraform-storywall"
  shared_config_files      = ["~/.aws/config"]
  shared_credentials_files = ["~/.aws/credentials"]
}

terraform {
  required_version = ">= 1.1.5"
  required_providers {
    aws = {
      version = ">= 4.18.0"
      source  = "hashicorp/aws"
    }
  }

  backend "remote" {
    hostname     = "app.terraform.io"
    organization = "storywall"
    workspaces {
      prefix = "aws-storywall-"
    }
  }
}
