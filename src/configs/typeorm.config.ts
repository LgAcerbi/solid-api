import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export const typeOrmConfig: TypeOrmModuleOptions = {
    type: 'mongodb',
    url: "mongodb+srv://acerbi:OzOTGrw393HOda2h@cluster0.baoln.mongodb.net/solid_api?retryWrites=true&w=majority",
    useNewUrlParser: true,
    autoLoadEntities: true,
    synchronize: true,
    logging: true,
    useUnifiedTopology: true,
}