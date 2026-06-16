import { Body, Controller, Post } from '@nestjs/common';
import {
    ApiBadRequestResponse,
    ApiBody,
    ApiOkResponse,
    ApiOperation,
    ApiTags,
    ApiUnauthorizedResponse,
} from '@nestjs/swagger';

import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {

    // inyectar el serivicio 
    constructor(private readonly authService: AuthService) {}

    @ApiOperation({
        summary: 'Iniciar sesión',
        description: 'Valida credenciales y devuelve un JWT',
    })
    @ApiBody({ type: LoginDto })
    @ApiOkResponse({
        description: 'Login exitoso.',
        schema: {
            example: {
                access_token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...',
                user: {
                    email: 'test@correo.com',
                    name: 'Chris',
                },
            },
        },
    })
    @ApiBadRequestResponse({
        description: 'El body no cumple con la validación del DTO.',
    })
    @ApiUnauthorizedResponse({
        description: 'Credenciales inválidas o usuario no encontrado.',
    })
    @Post('login')
    async login(@Body() loginDto: LoginDto) {
        return this.authService.login(loginDto);
    }
}
