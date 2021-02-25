import { BadRequestException, Injectable, PipeTransform } from "@nestjs/common";
import { ObjectId } from "mongodb";

@Injectable()
export class ObjectIdValidationPipe implements PipeTransform {

    transform(id: any): ObjectId {
        if(!this.isValidId(id)){
            throw new BadRequestException(`'${id}' is not a valid ObjectId`)
        }
        return id;
    }
    private isValidId(id: any) {
        try {
            return new ObjectId(id).toString() === id;
        } catch (error) {
            return null;
        }
    }
}