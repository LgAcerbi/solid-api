import { IsIn, IsNotEmpty, IsOptional } from 'class-validator'

export class GetUserFilterDto {
    @IsNotEmpty()
    nickname: string

    @IsIn(['TOPLANER', 'JUNGLER', 'MIDLANER', 'ADCARRY', 'SUPPORT'])
    position: string;
}