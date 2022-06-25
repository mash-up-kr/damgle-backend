resource "aws_lambda_function" "function" {
  function_name = var.lambda_function_name
  role          = aws_iam_role.iam_for_lambda.arn
  handler       = "dist/index.handler"
  s3_bucket     = aws_s3_bucket.lambda.id
  s3_key        = var.s3_lambda_key

  runtime = "nodejs16.x"

  environment {
    variables = {
      NODE_ENV     = "production"
      NODE_OPTIONS = "--enable-source-maps"
    }
  }

  depends_on = [
    aws_iam_role_policy_attachment.lambda_logs,
    aws_cloudwatch_log_group.lambda_log_group
  ]
}

resource "aws_cloudwatch_log_group" "lambda_log_group" {
  name              = "/aws/lambda/${var.lambda_function_name}"
  retention_in_days = 14
}
