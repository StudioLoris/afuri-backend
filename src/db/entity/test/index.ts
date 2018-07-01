import {Entity, ObjectID, ObjectIdColumn, Column} from 'typeorm';

@Entity()
export class Test {

    @ObjectIdColumn()
    public id : ObjectID;

    @Column()
    public firstName : string;

    @Column()
    public lastName : string;

}
