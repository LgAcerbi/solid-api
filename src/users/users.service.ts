import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './user.entity';
import { UserRepository } from './user.repository';

@Injectable()
export class UsersService {
    constructor(
        @InjectRepository(UserRepository)
        private userRepository: UserRepository
        ) {}
    //private users: User[] = [];

    async getAllUsers(): Promise<User[]>{
        const foundUsers = await this.userRepository.find();
        if(!foundUsers){
            throw new NotFoundException("There's no user registred");
        }
        return foundUsers;
    }
    
    // getAllUsers(): User[]{
    //     if(!this.users.length){
    //         throw new NotFoundException("There's no user registred");
    //     }
    //     return this.users;
    // }

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
    
    async getUserById(id: any): Promise<User>{
        const foundUser = await this.userRepository.findOne(id);
        if(!foundUser){
            throw new NotFoundException(`User with id '${id}' not found`);
        }
        return foundUser;
    }

    async setUser(createUserDto: CreateUserDto): Promise<User> {
        const {name, age, nickname, position} = createUserDto;
        const user = new User();
        user.name = name;
        user.age = age;
        user.nickname = nickname;
        user.position = position;

        return await user.save()
    }

    // setUser(createUserDto: CreateUserDto): User {
    //     const {name, age, nickname, position} = createUserDto;
        
    //     const user: User = {
    //         id: uuidv4(),
    //         name,
    //         age,
    //         nickname,
    //         position: position.toUpperCase(),
    //     }
    //     this.users.push(user);
    //     return user;
    // }

    // updateUserPositionById(id: string, position: string): User {
    //     const foundUser = this.getUserById(id)
    //     foundUser.position = position;
    //     return foundUser;
    // }

    // deleteUserById(id: string): any{
    //     const foundUserIndex = this.users.findIndex(user => user.id === id);
    //     if(!foundUserIndex){
    //         throw new NotFoundException()
    //     }
    //     this.users.splice(foundUserIndex,1)
    //     return {message: `User ${id} was deleted`};
    // }
}
