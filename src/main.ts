import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  
  app.setGlobalPrefix('api/v2');
  app.useGlobalPipes(
   new ValidationPipe({
    whitelist:true,//solo deja pasar la data que estamos esperando
    forbidNonWhitelisted:true,//exige que la propiedad eviadas son las correctas
   })
  )

  await app.listen(3000);

}
bootstrap();
