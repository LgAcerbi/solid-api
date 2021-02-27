import { BadRequestException, PipeTransform } from "@nestjs/common";

export class UserPositionValidationPipe implements PipeTransform {
    readonly allowedPositions = [
        'TOPLANER',
        'JUNGLER',
        'MIDLANER',
        'ADCARRY',
        'SUPPORT',
    ];

    transform(position: string){
        position = position.toUpperCase();

        if(!this.isValidPosition(position)){
            throw new BadRequestException(`'${position}' is not a valid position`)
        }
        return position;
    }

    private isValidPosition(position: string) {
        const indexFound = this.allowedPositions.indexOf(position)
        return indexFound !== -1;
    }
}