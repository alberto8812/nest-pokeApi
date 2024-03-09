import { Injectable } from '@nestjs/common';
import axios, { AxiosInstance } from 'axios';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';


@Injectable()
export class SeedService {
  //para que no cree una dependencia oculta
  private readonly axios: AxiosInstance =axios;
  constructor(
   @InjectModel(Pokemon.name)
   private readonly pokemonModel: Model<Pokemon>, //model de mong, y el generico de la entity
 ) {}


 async executeSeed(){
  const {data}= await this.axios.get<PokeResponse>('https://pokeapi.co/api/v2/pokemon?limit=16');
  data.results.forEach(async({name,url}) => {
     const no=+url.at(-2);
     const pokemon = await this.pokemonModel.create({name,no})
     
  });

  return 'seed ejecuatdo';
 }
}
