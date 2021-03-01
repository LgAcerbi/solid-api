import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication } from '@nestjs/common';
import * as request from 'supertest';
import { UsersModule } from './users.module';
import { UserRepository } from './user.repository';
import { ObjectID } from 'mongodb'

describe('UserController (e2e)', () => {
  let app: INestApplication;

  const userMock = {
    id: "6036f63d4c6efc2abca12fde",
    name: "Guilherme",
    age: 20,
    nickname: "Acerbi",
    position: "TOPLANER"
  }
  let userRepository;
  beforeEach(async () => {
    userRepository = {
      find: () => [userMock],
      findOne: () => userMock,
      createUser: () => userMock,
      findUsers: () => [userMock],
      updateUserPosition: () => userMock
    };
    const module: TestingModule = await Test.createTestingModule({
      imports: [UsersModule],
    }).overrideProvider(UserRepository)   //Override userRepository to not touch on DataBase
    .useValue(userRepository)     
    .compile();

    app = module.createNestApplication();
    await app.init();
  });

  describe('/user/all (GET)', () => {
    it('returns 200 and all users', async () => {
      await request(app.getHttpServer()) 
        .get('/user/all')
        .expect(200)
        .expect([userMock]);
    });

    it('returns 404 and Not Found', async () => {
      userRepository.find = () => undefined
      await request(app.getHttpServer()) 
        .get('/user/all')
        .expect(404)
        .expect({statusCode: 404,  message : "There's no user registred", error :"Not Found"})
    });
  })

  describe('/user (GET)', () => {
    it('returns 200 and users by filters', async () => {
     await request(app.getHttpServer()) 
        .get('/user')
        .query({ nickname: userMock.nickname, position: userMock.position })
        .expect(200)
        .expect([userMock]);
    })
    it('returns 404 and Not Found', async () => {
      userRepository.findUsers = () => undefined;
      await request(app.getHttpServer()) 
        .get('/user')
        .query({ nickname: new ObjectID(), position: userMock.position })
        .expect(404)
        .expect({statusCode: 404, message: "There's no user found with current filters", error: "Not Found"});
    })

    it('returns 400 and Bad Request', async () => {
      await request(app.getHttpServer()) 
        .get('/user')
        .query({ nickname: new ObjectID(), position: new ObjectID() })
        .expect(400)
    })
  })

  describe('/user/:id (GET)', () => {
    it('returns 200 and a user', async () => {
      await request(app.getHttpServer()) 
        .get(`/user/${userMock.id}`)
        .expect(200)
        .expect(userMock);
    });

    it('returns 404 and Not Found', async () => {
      userRepository.findOne = () => undefined;
      const randomId = new ObjectID();
      await request(app.getHttpServer()) 
        .get(`/user/${randomId}`)
        .expect(404)
        .expect({statusCode:404, message:`User with id '${randomId}' not found`, error:"Not Found"})
    });

    it('return 400 and Bad Request', async () => {
      await request(app.getHttpServer()) 
        .get(`/user/aaaaaaaa`)
        .expect(400)
        .expect({statusCode: 400, message: "'aaaaaaaa' is not a valid ObjectId", error: 'Bad Request'})
    });
  })
  
  describe('/user (POST)', () => {
    it('returns 201 and a new User', async () => {
      await request(app.getHttpServer()) 
        .post(`/user`)
        .send({name: "Guilherme", age: 20, nickname: "Acerbi", position: "TOPLANER"})
        .expect(201)
        .expect(userMock);
    });
    it('returns 400 and Bad Request', async () => {
      await request(app.getHttpServer()) 
        .post(`/user`)
        .send({})
        .expect(400)
    });
  })

  describe('/user (PATCH)', () => {
    it('returns 200 and a updated User', async () => {
      const updatedUser = userMock;
      updatedUser.position = "ADCARRY";
      userRepository.updateUserPosition = ()=> updatedUser;
      const response = await request(app.getHttpServer()) 
        .patch(`/user/${userMock.id}/ADCARRY`)
        .expect(200)
        .expect(updatedUser);
    });
    it('returns 400 and Bad Request', async () => {
      await request(app.getHttpServer()) 
        .patch('/user/aaaaaa/ADCARRY')
        .expect(400)
    });

    it('returns 404 and Bad Request', async () => {
      const randomId = new ObjectID();
      userRepository.findOne = () => undefined;
      await request(app.getHttpServer()) 
        .patch(`/user/${randomId}/ADCARRY`)
        .expect(404)
        .expect({statusCode:404, message:`User with id '${randomId}' not found`, error:"Not Found"})
    });
  })

  afterAll(async () => { 
    await app.close();
  });
});

// import { Test, TestingModule } from '@nestjs/testing';
