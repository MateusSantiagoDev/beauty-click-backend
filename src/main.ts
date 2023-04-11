import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  const config = new DocumentBuilder()
  .setTitle('BeautyClick')
  .setDescription('Sistema Completo de Gestão para Salão de Beleza')
  .setVersion('1.0.0')
  .addTag('Status')
  .addTag('Login')
  .addTag('Signup')
  .addTag('Address')
  .addTag('Location')
  .addTag('Services')
  .addTag('Calendar')
  .addBearerAuth()
  .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  
  await app.listen(3000);
}
bootstrap();
