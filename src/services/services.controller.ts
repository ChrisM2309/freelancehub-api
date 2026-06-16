import { Controller, Body, Post, Req, UseGuards } from '@nestjs/common';

import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { AuthenticatedUser} from 'src/auth/interfaces/authenticated-user.interface'

// tipo para manejar la info del usuario desde el requeuest 

type RequestWithUser = { user: AuthenticatedUser };
@Controller('services')
export class ServicesController {

    // inyectar el servicio de servicios
    constructor( private readonly servicesService: ServicesService){}

    @Post()
    create(@Body() createServiceDto: CreateServiceDto, @Req() req: RequestWithUser){
        return this.servicesService.create(createServiceDto, req.user.userId);
    }

}
