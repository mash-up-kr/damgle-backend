import { getSourceVersion } from '@damgle/utils';
import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle(`담글담글 - story api (${getSourceVersion()})`)
    .setDescription('컨텐츠 서비스')
    .setVersion('1.0.0') // TODO: webpack define plugin?
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, {
    useGlobalPrefix: true,
    swaggerOptions: { redirect: false },
  });
}
