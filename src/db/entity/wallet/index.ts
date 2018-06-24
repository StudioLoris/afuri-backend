import { Entity, PrimaryGeneratedColumn, Column, OneToOne, JoinColumn } from 'typeorm';
import { User } from '../user';

@Entity()
export class Wallet {

    @PrimaryGeneratedColumn()
    public id : number;

    @OneToOne(() => User)
    @JoinColumn()
    public user : User;

    @Column()
    public balance : number;

}
