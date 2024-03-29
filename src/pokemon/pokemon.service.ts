import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { ConfigService } from '@nestjs/config';

import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Model, isValidObjectId } from 'mongoose';
import { Pokemon } from './entities/pokemon.entity';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@Injectable()
export class PokemonService {

  private readonly defaultLimit:number;
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>, //model de mong, y el generico de la entity
    private readonly configService:ConfigService
  ) {
   this.defaultLimit= this.configService.get<number>('defaultLimit');

  }

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();

    try {
      const pokemon = await this.pokemonModel.create(createPokemonDto);
      return pokemon;
    } catch (error) {
      console.log(error);

      if (error.code === 11000) {
        throw new BadRequestException(
          `pokemon exists in db ${JSON.stringify(error.keyValue)}`,
        ); // petiocion erronea
      }
      throw new InternalServerErrorException(
        `can't create Pokemon -Check sercer logs`,
      ); //error del servidor
    }
  }

   findAll(paginationDto:PaginationDto) {
    const {limit=10,offset=0}=paginationDto;
    return this.pokemonModel.find()
    .limit(this.defaultLimit)
    .skip(offset)
    .sort({
      no:1
    })
    ;
    
  }

  async findOne(term: string) {
    //reglas de validacion
    let pokemon: Pokemon;

    if (!pokemon && !isNaN(+term)) {
      pokemon = await this.pokemonModel.findOne({ no: term });
    }
    //Mongo Id
    if (isValidObjectId(term)) {
      pokemon = await this.pokemonModel.findOne({ _id: term });
    }
    //its by name
    if (!pokemon) {
      pokemon = await this.pokemonModel.findOne({
        name: term.toLowerCase().trim(),
      });
    }

    if (!pokemon)
      throw new NotFoundException(
        `pokemon with id ,name or no "${term}" no found`,
      );
    return pokemon;
  }

  async update(term: string, updatePokemonDto: UpdatePokemonDto) {
    const pokemon = await this.findOne(term);

    if (updatePokemonDto.name) {
      updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
      const validationName = await this.pokemonModel.findOne({
        name: updatePokemonDto.name,
      });
    }

    try {
      await pokemon.updateOne(updatePokemonDto, { new: true });
      return { ...pokemon.toJSON(), ...updatePokemonDto };
    } catch (error) {
      this.hamdleException(error);
    }
  }

  async remove(id: string) {

    // const pokemon= await this.findOne(id);
    // await pokemon.deleteOne(); 
   // return {id};

   const result = await this.pokemonModel.deleteOne({_id:id});

   return result;

  }



  private hamdleException(error: any) {
    if (error.code === 11000) {
      throw new BadRequestException(
        `Pokemin exist in db ${JSON.stringify(error.keyValue)}`,
      );
    }
    throw new InternalServerErrorException(
      `Cant createPokemin -Check server logs`,
    );
  }
}
