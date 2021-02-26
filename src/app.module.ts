import { Module } from '@nestjs/common';
import { UsersModule } from './users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DatabaseConfig } from './configs/database.config'

@Module({
  imports: [
    ConfigModule.forRoot(
      {isGlobal: true}
    ),
    TypeOrmModule.forRoot(DatabaseConfig.getConfigs()),
    UsersModule,
  ],
})
export class AppModule {}
