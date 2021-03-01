import { NotFoundException } from '@nestjs/common/exceptions/not-found.exception';
import { Test } from '@nestjs/testing'
import { UserRepository } from './user.repository';
import { UsersService } from './users.service';

describe('UsersService', () => {
    let usersService;
    let userRepository
    const mockUser = {
        id: "6036f63d4c6efc2abca12fde",
        name: "Guilherme",
        age: 20,
        nickname: "Acerbi",
        position: "TOPLANER"
    }
    beforeEach(async ()=> {
        const module = await Test.createTestingModule({
            providers: [
                UsersService,
                UserRepository,
            ],
        }).compile();
        usersService = await module.get<UsersService>(UsersService);
        userRepository = await module.get<UserRepository>(UserRepository);
    });

    describe('getAllUsers', () => {
        it('return all users', async ()=> {
            jest.spyOn(userRepository, 'find').mockImplementation(() => [mockUser]);
            expect(await usersService.getAllUsers()).toStrictEqual([mockUser]);
        });
        it('throw NotFoundException when no user is found', async ()=> {
            jest.spyOn(userRepository, 'find').mockImplementation(() => undefined);
            try {
                await usersService.getAllUsers();
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundException);
            }
        });
    });

    describe('getUserById', ()=> {
        it('get a user', async ()=> {
            jest.spyOn(userRepository, 'findOne').mockImplementation(() => mockUser);
            expect(await usersService.getUserById(mockUser.id)).toStrictEqual(mockUser);
        });
        it('throw NotFoundException when no user is found', async ()=> {
            jest.spyOn(userRepository, 'findOne').mockImplementation(() => undefined);
            try {
                await usersService.getUserById(mockUser.id);
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundException);
            }
        });
    });

    describe('setUser', ()=> {
        it('create a user', async ()=> {
            jest.spyOn(userRepository, 'createUser').mockImplementation(() => mockUser);
            const createUserDto = {name: "Guilherme", age: 20, nickname: "Acerbi", position: "TOPLANER"}
            expect(await usersService.setUser(createUserDto)).toStrictEqual(mockUser);
        });
    });

    describe('deleteUserById', ()=> {
        it('delete a user by Id', async ()=> {
            jest.spyOn(userRepository, 'findOne').mockImplementation(() => mockUser);
            jest.spyOn(userRepository, 'delete').mockImplementation();
            expect(await usersService.deleteUserById(mockUser.id)).toStrictEqual({message: `User with id '${mockUser.id}' was deleted`});
        });
        it('throw NotFoundException when no user is found', async ()=> {
            jest.spyOn(userRepository, 'findOne').mockImplementation(() => undefined);
            try {
                await usersService.deleteUserById(mockUser.id);
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundException);
            }
        });
    });

    describe('updateUserPositionById', () => {
        it('update a user position by Id', async () => {
            const updatedUser = mockUser;
            updatedUser.position = 'ADCARRY'
            jest.spyOn(userRepository, 'findOne').mockResolvedValue(mockUser)
            jest.spyOn(userRepository, 'updateUserPosition').mockImplementation(() => updatedUser); 
            expect(await usersService.updateUserPositionById(mockUser.id, 'ADCARRY')).toBe(updatedUser)
        })
        it('throw NotFoundException when no user is found', async ()=> {
            jest.spyOn(userRepository, 'findOne').mockImplementation(() => undefined);
            try {
                await usersService.updateUserPositionById(mockUser.id, 'ADCARRY');
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundException);
            } 
        });
    });

    describe('getUsersByFilters', () => {
        it('return users by filters', async ()=> {
           jest.spyOn(userRepository, 'findUsers').mockImplementation(() => [mockUser])
           expect(await usersService.getUsersByFilters({nickname: mockUser.nickname, position: mockUser.position})).toStrictEqual([mockUser]);
        });
        it('throw NotFoundException when no user is found', async ()=> {
            jest.spyOn(userRepository, 'findUsers').mockImplementation(() => undefined);
            try {
                await usersService.getUsersByFilters({nickname: 'TESTE', position: 'ADCARRY'});
            } catch (error) {
                expect(error).toBeInstanceOf(NotFoundException);
            } 
        });
    })
});
