import { Body, Controller, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import {
    ApiBearerAuth,
    ApiBadRequestResponse,
    ApiBody,
    ApiCreatedResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthenticatedUser} from 'src/auth/interfaces/authenticated-user.interface'

// tipo para manejar la info del usuario desde el requeuest 

type RequestWithUser = { user?: AuthenticatedUser };

@ApiTags('Services')
@Controller('services')
export class ServicesController {

    // inyectar el servicio de servicios
    constructor( private readonly servicesService: ServicesService){}

    @ApiBearerAuth('jwt')
    @ApiOperation({
        summary: 'Crear un servicio',
        description: 'Crea un nuevo servicio asociado al usuario autenticado.',
    })
    @ApiBody({ type: CreateServiceDto })
    @ApiCreatedResponse({
        description: 'Servicio creado correctamente.',
        schema: {
            example: {
                id: 1,
                title: 'Desarollo de Landing Page',
                category: 'Desarrollo Web',
                description: 'Hacer la landing de tu empresa en 2 semanas',
                price: 250,
                provider: {
                    id: 3,
                    name: 'Chris',
                },
            },
        },
    })
    @ApiBadRequestResponse({
        description: 'El body no cumple con la validación del DTO.',
    })
    @ApiUnauthorizedResponse({
        description: 'Token faltante, inválido o usuario no autenticado.',
    })
    @UseGuards(JwtAuthGuard)
    @Post()
    create(@Body() createServiceDto: CreateServiceDto, @Req() req: RequestWithUser){
        const userId = req.user?.userId;

        if (!userId) {
            throw new UnauthorizedException('Usuario no autenticado');
        }

        return this.servicesService.create(createServiceDto, userId);
    }

}
