import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    cors: true,
  });

  app.set('trust proxy', 1);

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('Spotify-Server')
    .setDescription(
      'Este projeto foi desenvolvido no quinto módulo do curso de back-end da Blue EdTech com foco em aprimorar nossas habilidades em criar uma API que utilize TypeScript, NestJs, Prisma ORM e PostgreSQL. Para ter mais informações de como usar a API e acessar as rotas que necessitam de um Profile, acesse essa página 🚀🚀🚀 https://mlucasdev.github.io/spotify-server-documentation-client/ 🚀🚀🚀',
    )
    .setVersion('1.0.0')
    .addTag('status')
    .addTag('auth')
    .addTag('user')
    .addTag('profile')
    .addTag('home-page')
    .addTag('manager-admin')
    .addTag('user-plan')
    .addTag('artist')
    .addTag('country')
    .addTag('album')
    .addTag('song')
    .addTag('profile-favorite-song')
    .addTag('category')
    .addTag('playlist')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT || 3006);
}
bootstrap();
