import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserFilterDto } from './dto/get-user-filter.dto';
import { UserPositionValidationPipe } from './pipes/user-position-validation.pipe';
import { User } from './user.model';
import { UsersService } from './users.service';

@Controller('user')
export class UsersController {
    constructor(private userService: UsersService){}

    @Get()
    getUsers(@Query(ValidationPipe) filterDto: GetUserFilterDto): User[] {
        if(Object.keys(filterDto).length){
            return this.userService.getUsersByFilters(filterDto);
        }
        else{
            return this.userService.getAllUsers();
        }
    }

    @Get('/:id')
    getUserById(@Param('id') id: string): User {
        return this.userService.getUserById(id);
    }

    @Post()
    @UsePipes(ValidationPipe)
    setUser(@Body() createUserDto: CreateUserDto): User {
        return this.userService.setUser(createUserDto);
    }
    //Exemplo de validação com pipe builtIn, utiliza class-validator

    @Patch('/:id/:position')
    updateUserPositionById(@Param('id') id: string, @Param('position', UserPositionValidationPipe) position: string): User{
        return this.userService.updateUserPositionById(id, position);
    }
    //Exemplo de validação com pipe personalizado

    @Delete('/:id')
    deleteUserById(@Param('id') id: string): User{
        return this.userService.deleteUserById(id);
    }
}
