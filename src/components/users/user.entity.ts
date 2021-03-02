import { BaseEntity, Column, Entity, ObjectID, ObjectIdColumn } from "typeorm";

@Entity()
export class User extends BaseEntity {
    @ObjectIdColumn() //Decorator usado apenas para MongoDB
    id: ObjectID;

    @Column()
    name: string;

    @Column()
    age: number;
    
    @Column()
    nickname: string;

    @Column()
    position: string;
}