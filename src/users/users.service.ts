import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EntitySubscriberInterface, EventSubscriber, InsertEvent, ObjectID } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { GetUserFilterDto } from './dto/get-user-filter.dto';
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

    async getUsersByFilters(filterDto: GetUserFilterDto): Promise<User[]> {
        const foundUsers = this.userRepository.findUsers(filterDto)
        if(!foundUsers){
            throw new NotFoundException("There's no user found with current filters");
        }
        return foundUsers;
    }
    
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

    async updateUserPositionById(id: ObjectID, position: string): Promise<User> {
        const foundUser = await this.getUserById(id);
        foundUser.position = position;
        return await foundUser.save();
    }
    
    async deleteUserById(id: ObjectID): Promise<Object>{
        // const result = await this.userRepository.delete(id);      MongoDB driver não suporta (affected == undefined)
        const foundUser = await this.getUserById(id);
        await this.userRepository.delete(foundUser.id);
        return {message: `User with id '${id}' was deleted`}
    }   
}
