import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { ObjectId } from 'mongodb';
import { EntitySubscriberInterface, EventSubscriber, InsertEvent, ObjectID } from 'typeorm';
import { DeleteResult } from 'typeorm/query-builder/result/DeleteResult';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
@EventSubscriber()
export class UsersService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
    ) {}

    async getAllUsers(): Promise<User[]>{
        const foundUsers = await this.userRepository.find();
        if(!foundUsers){
            throw new NotFoundException("There's no user registred");
        }
        return foundUsers;
    }

    // getUsersByFilters(filterDto): User[] {
    //     const {nickname, position} = filterDto;
    //     let users = this.getAllUsers();
    //     if(position){
    //         users = users.filter(user => user.position === position);
    //     }
    //     if(nickname){
    //         users = users.filter(user => user.nickname.includes(nickname));
    //     }
    //     if(!users.length){
    //         throw new NotFoundException();
    //     }
    //     return users;
    // }
    
    async getUserById(id: ObjectID): Promise<User>{
        const foundUser = await this.userRepository.findOne(id);
        if(!foundUser){
            throw new NotFoundException(`User with id '${id}' not found`);
        }
        return foundUser;
    }

    async setUser(createUserDto: CreateUserDto): Promise<User> {
        return await this.userRepository.createUser(createUserDto);
    }

    // updateUserPositionById(id: string, position: string): User {
    //     const foundUser = this.getUserById(id)
    //     foundUser.position = position;
    //     return foundUser;
    // }
    async deleteUserById(id: ObjectID): Promise<any>{
        // const result = await this.userRepository.delete(id);      MongoDB driver não suporta (affected == undefined)
        const foundUser = await this.getUserById(id);
        return {message: `User with id '${id}' was deleted`}
    }   
}
