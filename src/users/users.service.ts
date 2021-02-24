import { Injectable, NotFoundException } from '@nestjs/common';
import { Positions, User } from './user.model';
import {v4 as uuidv4} from 'uuid';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UsersService {
    private users: User[] = [];
    
    getAllUsers(): User[]{
        if(!this.users.length){
            throw new NotFoundException("There's no user registred");
        }
        return this.users;
    }

    getUsersByFilters(filterDto): User[] {
        const {nickname, position} = filterDto;
        let users = this.getAllUsers();
        if(position){
            users = users.filter(user => user.position === position);
        }
        if(nickname){
            users = users.filter(user => user.nickname.includes(nickname));
        }
        if(!users.length){
            throw new NotFoundException();
        }
        return users;
    }

    getUserById(id: string): User {
        const foundUser = this.users.find(user => user.id === id);
        if(!foundUser){
            throw new NotFoundException();
        }
        return foundUser;
    }

    setUser(createUserDto: CreateUserDto): User {
        const {name, age, nickname, position} = createUserDto;
        
        const user: User = {
            id: uuidv4(),
            name,
            age,
            nickname,
            position: position.toUpperCase(),
        }
        this.users.push(user);
        return user;
    }

    updateUserPositionById(id: string, position: string): User {
        const foundUser = this.getUserById(id)
        foundUser.position = position;
        return foundUser;
    }

    deleteUserById(id: string): any{
        const foundUserIndex = this.users.findIndex(user => user.id === id);
        if(!foundUserIndex){
            throw new NotFoundException()
        }
        this.users.splice(foundUserIndex,1)
        return {message: `User ${id} was deleted`};
    }
}
