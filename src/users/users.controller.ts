import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserFilterDto } from './dto/get-user-filter.dto';
import { ObjectIdValidationPipe } from '../global-pipes/objectid-validation.pipe';
import { UserPositionValidationPipe } from './pipes/user-position-validation.pipe';
import { User } from './user.entity';
import { UsersService } from './users.service';
import { ObjectID } from 'typeorm';

@Controller('user')
export class UsersController {
    constructor(private userService: UsersService){}

    @Get()
    getUsersByFilters(@Query(ValidationPipe) filterDto: GetUserFilterDto): Promise<User[]> {
        return this.userService.getUsersByFilters(filterDto);
    }

    @Get('/all')
    getAllUsers(): Promise<User[]> {
        return this.userService.getAllUsers();
    }

    @Get('/:id')
    getUserById(@Param('id', ObjectIdValidationPipe) id: ObjectID): Promise<User> {
        return this.userService.getUserById(id);
    }

    //Exemplo de validação com pipe builtIn, utiliza class-validator
    @Post()
    @UsePipes(ValidationPipe)
    setUser(@Body() createUserDto: CreateUserDto): Promise<User> {
         return this.userService.setUser(createUserDto);
    }
    

    //Exemplo de validação com pipe personalizado
    @Patch('/:id/:position')
    updateUserPositionById(
        @Param('id', ObjectIdValidationPipe) id: ObjectID, 
        @Param('position', UserPositionValidationPipe) position: string
        ): Promise<User> {
        return this.userService.updateUserPositionById(id, position);
    }

    @Delete('/:id')
    deleteUserById(@Param('id', ObjectIdValidationPipe) id: any): Promise<any>{
        return this.userService.deleteUserById(id);
    }
}
