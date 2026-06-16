import { Controller, Body, Post, Req, UseGuards } from '@nestjs/common';

import { ServicesService } from './services.service';
import { CreateServiceDto } from './dto/create-service.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('services')
export class ServicesController {}
