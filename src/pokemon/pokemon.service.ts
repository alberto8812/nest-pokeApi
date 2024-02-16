import { BadRequestException, Injectable, InternalServerErrorException, NotFoundException } from '@nestjs/common';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class PokemonService {

  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel:Model<Pokemon> //model de mong, y el generico de la entity
  ){}


  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name=createPokemonDto.name.toLowerCase();

    try {
      
      const pokemon= await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
     console.log(error) 

     if(error.code===11000){
      throw new BadRequestException(`pokemon exists in db ${JSON.stringify(error.keyValue)}`);// petiocion erronea
     }
     throw new InternalServerErrorException(`can't create Pokemon -Check sercer logs`);//error del servidor
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string) {
    //reglas de validacion 
    let pokemon:Pokemon;
    
    if(!pokemon && !isNaN(+term)){
      pokemon= await this.pokemonModel.findOne({no:term});
 
    };
    //Mongo Id
    if(!isValidObjectId(term)){
      console.log("id")
     
    };
    //its by name
    if(!pokemon){
      console.log("name")
      pokemon= await this.pokemonModel.findOne({name:term.toLowerCase().trim()});
    }
    console.log("name")

    if(!pokemon) throw new NotFoundException(`pokemon with id ,name or no "${term}" no found`);
    return pokemon 
  }

  update(id: number, updatePokemonDto: UpdatePokemonDto) {
    return `This action updates a #${id} pokemon`;
  }

  remove(id: number) {
    return `This action removes a #${id} pokemon`;
  }
}
