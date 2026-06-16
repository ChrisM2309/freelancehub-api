import { Service } from 'src/services/service.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('users')
export class User {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({unique: true})
    email: string;

    @Column()
    name: string;

    @Column()
    password: string;

    @OneToMany(() => Service, (service) => service.provider)
    services: Service[];
}

