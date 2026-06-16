import { Controller, Get } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import { ServicesService } from '../services/services.service';


@ApiTags('Public')
@Controller('public')
export class PublicController {
    // inyectar servicio de servicios
    
    constructor(private readonly servicesService: ServicesService) {}

    @ApiOperation({
        summary: 'Listar servicios públicos',
        description: 'Devuelve todos los servicios con la información del proveedor.',
    })
    @ApiOkResponse({
        description: 'Listado de servicios obtenido correctamente.',
        schema: {
            example: [
                {
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
            ],
        },
    })
    @Get('services')
    findAllServices() {
        return this.servicesService.findAll();
    }
}
