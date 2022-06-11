## 위치 기반 커뮤니티 **담글담글** Infra

### 주요 버전

**Terraform Version:** `1.1.5`
**aws provider:** `4.18.0`

# resource

- S3 bucket (S3 bucket, S3 buket policy)
- Serverless (Lambda, IAM, CloudWatch, API Gateway)

## Lambda Variables

| Variable                         | Meaning                       |
| :------------------------------- | :---------------------------- |
| `lambda_function_name`              | Value of the Name for the lambda function         |
| `s3_lambda_key`             | Lambda key to store lambda archive      |

## S3_bucket Variables

| Variable                  | Meaning                                         |
| :------------------------ | :---------------------------------------------- |
| `block_public_acls`       | block public acls enabled `default : false`       |
| `block_public_policy`     | block public policy enabled `default : false`     |
| `ignore_public_acls`      | ignore public acls enabled `default : false`      |
| `restrict_public_buckets` | restrict public buckets enabled `default : false` |