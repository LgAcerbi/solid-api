import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { typeOrmConfig } from './configs/typeorm.config'
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    ConfigModule.forRoot(
      {isGlobal: true}
    ),
    TypeOrmModule.forRoot({
      type: 'mongodb',
      url: process.env.MONGO_URI,
      useNewUrlParser: true,
      autoLoadEntities: true,
      synchronize: true,
      logging: true,
      useUnifiedTopology: true
    }),
    UsersModule,
  ],
})
export class AppModule {}
