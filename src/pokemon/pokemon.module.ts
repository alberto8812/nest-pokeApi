import { Module } from '@nestjs/common';
import { PokemonService } from './pokemon.service';
import { PokemonController } from './pokemon.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Pokemon, PokemonScgema } from './entities/pokemon.entity';
import { ConfigModule } from '@nestjs/config';

@Module({
  controllers: [PokemonController],
  providers: [PokemonService],
  imports:[
    ConfigModule,
    MongooseModule.forFeature([
      {
        name:Pokemon.name,// name que estiende del documento
        schema:PokemonScgema,
      }
    ])//pide la defincion de los modelos
  ],
  exports:[MongooseModule]
})
export class PokemonModule {}
