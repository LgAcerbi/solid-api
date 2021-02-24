import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
// import { UsersController } from './users/users.controller';
// import { UsersService } from './users/users.service';
import { typeOrmConfig } from './configs/typeorm.config'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    TypeOrmModule.forRoot(typeOrmConfig),
    UsersModule,
  ],
  /*controllers: [UsersController], 
  providers: [UsersService] */
})
export class AppModule {}
