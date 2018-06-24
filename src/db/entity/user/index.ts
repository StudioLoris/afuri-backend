import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from 'typeorm';
import { Wallet } from '../wallet';

@Entity()
export class User {

    @PrimaryGeneratedColumn()
    public id : number;

    @Column()
    public email : string;

    @OneToOne(() => Wallet, (wallet) => wallet.user)
    public wallet : Wallet;

}
