import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { staticEnv } from '@damgle/utils';

export class S3 {
  private constructor(private readonly client: S3Client, private readonly bucket: string) {}

  static public(env = { bucket: staticEnv.s3_public_bucket, region: staticEnv.aws_region }) {
    return new S3(new S3Client({ region: env.region }), env.bucket);
  }

  static private(env = { bucket: staticEnv.s3_private_bucket, region: staticEnv.aws_region }) {
    return new S3(new S3Client({ region: env.region }), env.bucket);
  }

  async uploadJson(
    key: string,
    data: Record<string, any>,
    { ACL = 'private' }: { ACL?: 'private' | 'public-read' } = {}
  ) {
    console.log({ data, key, ACL, bucket: this.bucket });
    await this.client.send(
      new PutObjectCommand({
        Bucket: this.bucket,
        Key: key,
        ACL,
        Body: JSON.stringify(data),
        ContentEncoding: 'utf-8',
        ContentType: 'application/json; charset=utf-8',
      })
    );
  }
}
