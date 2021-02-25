import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { ObjectID } from "mongodb";

@Injectable()
export class ObjectIdValidationPipe implements PipeTransform {

    transform(id: any): ObjectID {
        if(!this.isValidId(id)){
            throw new BadRequestException(`'${id}' is not a valid ObjectId`)
        }
        return id;
    }
    private isValidId(id: any) {
        try {
            return new ObjectID(id).toString() === id;
        } catch (error) {
            return null;
        }
    }
}