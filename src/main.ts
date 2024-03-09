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
    transform:true,//si queremos que lo transforme la informacion que viene por los dto
    transformOptions:{
      enableImplicitConversion:true// permite transformar los datos de los dto
    }
   })

  )

  await app.listen(3000);

}
bootstrap();
