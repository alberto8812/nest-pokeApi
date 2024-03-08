import { ArgumentMetadata, BadRequestException, Injectable, PipeTransform } from '@nestjs/common';
import { isValidObjectId } from 'mongoose';

@Injectable()
export class ParseMongoIdPipe implements PipeTransform {
 
 
  transform(value: string, metadata: ArgumentMetadata) {
   // console.log({value,metadata})
    if(!isValidObjectId(value)){// SI NO ES UN MONGO ID
      throw new BadRequestException(`${value} is not a valid MongoID`)
    }
    return value;
  }
}
