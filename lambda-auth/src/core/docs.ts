import { getSourceVersion } from '@damgle/utils';
import { INestApplication } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle(`담글담글 - auth api (${getSourceVersion()})`)
    .setDescription('인증 서비스')
    .setVersion('1.0.0') // TODO: webpack define plugin?
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, {
    useGlobalPrefix: true,
    swaggerOptions: { redirect: false },
  });
}
