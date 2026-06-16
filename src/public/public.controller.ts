import { Controller, Get} from '@nestjs/common';
import { ServicesService } from '../services/services.service';


@Controller('public')
export class PublicController {
    // inyectar servicio de servicios
    
    constructor(private readonly servicesService: ServicesService) {}

    @Get('services')
    findAllServices() {
        return this.servicesService.findAll();
    }
}
