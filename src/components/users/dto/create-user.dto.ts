import { IsNotEmpty, Min, IsIn } from 'class-validator'  

export class CreateUserDto {
    @IsNotEmpty()
    name: string

    @IsNotEmpty()
    @Min(10)
    age: number

    @IsNotEmpty()
    nickname: string

    @IsNotEmpty()
    @IsIn(['TOPLANER', 'JUNGLER', 'MIDLANER', 'ADCARRY', 'SUPPORT'])
    position: string
}