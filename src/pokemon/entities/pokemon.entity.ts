import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";

@Schema() //INDICA QUE ES UN ESQUEMA DE BASE DE DATOS
export class Pokemon extends Document {
    @Prop({//para que los valores sean unicos definimos el decorador Prop
        unique:true,
        index:true,//nos indica donde esta el nombre
    })
    name:string;
    @Prop({//para que los valores sean unicos definimos el decorador Prop
        unique:true,
        index:true,//nos indica donde esta el nombre
    })
    no:string;
}

//cuan se inicia la base de datos son las definiciones ,reglas y columnas

export const PokemonScgema=SchemaFactory.createForClass(Pokemon)
