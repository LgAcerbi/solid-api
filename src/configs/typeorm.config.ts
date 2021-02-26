import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import { ConfigModule } from '@nestjs/config';

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mongodb',
    url: process.env.MONGO_URI,
    useNewUrlParser: true,
    autoLoadEntities: true,
    synchronize: true,
    logging: true,
    useUnifiedTopology: true,
}