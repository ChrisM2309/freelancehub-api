import { Injectable } from '@nestjs/common';

import {InjectRepository} from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { UsersService } from 'src/users/users.service';
import { Service } from './service.entity';
import { CreateServiceDto } from './dto/create-service.dto';

// este debe de poder crear servicios, para usuarios autenticados

@Injectable()
export class ServicesService {

    // inyectar repsositorio de servicios y el servicio de usuarios 
    constructor(
        @InjectRepository(Service) private readonly serviceRepository: Repository<Service>,
        private readonly usersService: UsersService
    ) {}


    // crear un servicio 
    async create(createServiceDto: CreateServiceDto, providerId: number){

        // buscar si existe el usuario del provider
        const provider = await this.usersService.findById(providerId);
        if (!provider) {
            throw new Error('Proveedor no encontrado');
        }

        // crear desde el DTO
        const service = this.serviceRepository.create({
            title:  createServiceDto.title,
            category: createServiceDto.category,
            description: createServiceDto.description,
            price: createServiceDto.price,
            provider: provider
        });

        // guardar 
        const savedService = await this.serviceRepository.save(service);

        // mostrar
        return {
            id: savedService.id,
            title: savedService.title,
            category: savedService.category,
            description: savedService.description,
            price: savedService.price,
            provider: {
                id: provider.id,
                name: provider.name,
            }
        }
    }

    // listar todos los servicios, publico 
    async findAll() {
        
        const services = await this.serviceRepository.find({ relations: {provider: true}, order : {id: 'ASC'} });

        return services.map(service => ({
            id: service.id,
            title: service.title,   
            category: service.category,
            description: service.description,
            price: service.price,
            provider: {
                id: service.provider.id,
                name: service.provider.name,
            }
        }));
    }
}
