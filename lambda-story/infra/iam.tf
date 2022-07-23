resource "aws_iam_role" "iam_for_lambda" {
  name = "${var.lambda_function_name}_iam_for_lambda"

  assume_role_policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Sid    = "AssumeRoleForLambda"
        Action = "sts:AssumeRole"
        Effect = "Allow"
        Principal = {
          Service = "lambda.amazonaws.com"
        }
      }
    ]
  })

  tags = {
    Name = "${var.lambda_function_name}_iam_for_lambda"
  }
}

resource "aws_iam_policy" "lambda_logging" {
  name        = "${var.lambda_function_name}_lambda_logging"
  description = "IAM policy for logging from a lambda"

  policy = jsonencode({
    Version = "2012-10-17",
    Statement = [
      {
        Action = [
          "logs:CreateLogGroup",
          "logs:CreateLogStream",
          "logs:PutLogEvents"
        ],
        Resource = "arn:aws:logs:*:*:*"
        Effect   = "Allow"
      }
    ]
  })

  tags = {
    Name = "${var.lambda_function_name}_lambda_logging"
  }
}

resource "aws_iam_role_policy_attachment" "lambda_logs" {
  role       = aws_iam_role.iam_for_lambda.name
  policy_arn = aws_iam_policy.lambda_logging.arn
}
