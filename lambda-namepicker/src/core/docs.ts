import { INestApplication } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

export function setupSwagger(app: INestApplication): void {
  const config = new DocumentBuilder()
    .setTitle('담글담글 - namepicker api')
    .setDescription('닉네임 생성기')
    .setVersion('1.0.0') // TODO: webpack define plugin?
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        name: 'JWT',
        in: 'header',
      },
      'access-token'
    )
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api-docs', app, document, { useGlobalPrefix: true, swaggerOptions: { redirect: false } });
}
