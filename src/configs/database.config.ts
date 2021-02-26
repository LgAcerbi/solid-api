import { TypeOrmModuleOptions } from "@nestjs/typeorm"

export class DatabaseConfig {
    //typeOrmConfig: TypeOrmModuleOptions
    static getConfigs(): TypeOrmModuleOptions{
        const typeOrmConfig: TypeOrmModuleOptions = {
            type: 'mongodb',
            url: process.env.MONGO_URI,
            useNewUrlParser: true,
            autoLoadEntities: true,
            synchronize: true,
            logging: true,
            useUnifiedTopology: true,
        }
        return typeOrmConfig;
    }
}