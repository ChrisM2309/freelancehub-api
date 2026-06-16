import { Body, Controller, Post, Req, UnauthorizedException, UseGuards } from '@nestjs/common';
import { ApiBearerAuth } from '@nestjs/swagger';

import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthenticatedUser} from 'src/auth/interfaces/authenticated-user.interface'

// tipo para manejar la info del usuario desde el requeuest 

type RequestWithUser = { user?: AuthenticatedUser };
@Controller('services')
export class ServicesController {

    // inyectar el servicio de servicios
    constructor( private readonly servicesService: ServicesService){}

    @ApiBearerAuth()
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
