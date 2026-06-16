import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateServiceDto {    
    // titulo de servicio
    @ApiProperty({
        example: 'Desarrollo de Landing Page',
        description: 'El titulo del servicio',
    })
    @IsString()
    @IsNotEmpty()
    title: string;

    // categoria del servicio
    @ApiProperty({
        example: 'Desarrollo Web',
        description: 'Categoria del servicio',
    })
    @IsString()
    @IsNotEmpty()
    category: string;

    // descripcion del servicio
    @ApiProperty({
        example: 'Hacer una landing page de tu empresa en 2 semanas',
        description: 'Descripcion del servicio',
    })
    @IsString()
    @IsNotEmpty()
    description: string;


    // precio del servicio 
    @ApiProperty({
        example: 250.00,
        description: 'Precio del servicio',
    })
    price: number; 
}
