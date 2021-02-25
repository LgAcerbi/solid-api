import { EntityRepository, Repository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {
    async createUser(createUserDto: CreateUserDto): Promise<User>{
        const {name, age, nickname, position} = createUserDto;
        
        const user = new User();
        user.name = name;
        user.age = age;
        user.nickname = nickname;
        user.position = position;

        return await user.save();
    }
}