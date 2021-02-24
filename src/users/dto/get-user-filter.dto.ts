import { IsIn, IsNotEmpty, IsOptional } from 'class-validator'

export class GetUserFilterDto {
    @IsOptional()
    @IsNotEmpty()
    nickname: string

    @IsOptional()
    @IsIn(['TOPLANER', 'JUNGLER', 'MIDLANER', 'ADCARRY', 'SUPPORT'])
    position: string;
}