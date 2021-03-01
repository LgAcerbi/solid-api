import { EntityRepository, ObjectID, Repository, MongoRepository } from "typeorm";
import { CreateUserDto } from "./dto/create-user.dto";
import { GetUserFilterDto } from "./dto/get-user-filter.dto";
import { User } from "./user.entity";

@EntityRepository(User)
export class UserRepository extends Repository<User> {

    async findUsers(filterDto: GetUserFilterDto): Promise<User[]>{
        const {nickname, position} = filterDto;
        const users = await this.find({
            where: {
                nickname: {$eq: nickname},
                position: {$eq: position}
            }
        });
        return users;
    }

    async createUser(createUserDto: CreateUserDto): Promise<User>{
        const {name, age, nickname, position} = createUserDto;
        
        const user = new User();
        user.name = name;
        user.age = age;
        user.nickname = nickname;
        user.position = position;

        return await user.save();
    }

    async updateUserPosition(foundUser: User, position: string): Promise<User>{
        foundUser.position = position;
        foundUser.save();
        return foundUser;
    }
}