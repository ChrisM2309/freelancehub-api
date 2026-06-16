import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common/pipes/validation.pipe';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);

  // validaciones de dto
  app.useGlobalPipes(new ValidationPipe({whitelist: true, forbidNonWhitelisted: true}));

  // iniciar la documentacion
  const swaggerConfig = new DocumentBuilder()
    .setTitle('Freelancehub API')
    .setDescription('API para prestacion de servicios profesionales')
    .setVersion('1.0')
    .addBearerAuth(
      {
        type: 'http',
        scheme: 'bearer',
        bearerFormat: 'JWT',
        name: 'Authorization',
        in: 'header',
      },
      'jwt',
    )
    .build();

    // crear swager en ruta api 
    const document = SwaggerModule.createDocument(app, swaggerConfig);
    SwaggerModule.setup('api', app, document);

    await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
