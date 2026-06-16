import { User } from 'src/users/user.entity';
import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity('services')
export class Service {

    @PrimaryGeneratedColumn()
    id: number;

    // titulo del servicio
    @Column()
    title: string;

    // categoria del servicio
    @Column()
    category: string;

    // descripcion
    @Column()
    description: string;

    // precio
    @Column({type: 'decimal', precision: 10, scale: 2})
    price: number;

    // proveedores 
    @ManyToOne(() => User, (user) => user.services, { nullable : false})
    provider: User;
}
