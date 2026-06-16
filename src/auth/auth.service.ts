import { Injectable } from '@nestjs/common';

import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
    // inyectar el servicio de jwt y el de usuarios
  constructor(
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  // hacer el login 

  async login(loginDto: LoginDto) {
    // buscar el usuario por email
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
        throw new Error('Usuario no encontrado');
    }
    // verificar la contraseña
    if (user.password !== loginDto.password) {
        throw new Error('Credenciales incorrectas');
    }

    // hacer el payload
    const payload = { email: user.email, sub: user.id, name: user.name };
    // hacer el token
    const accesToken = this.jwtService.sign(payload);

    // regresar la data ordenada 
    return { 
        access_token: accesToken,
        user: {
            email: user.email,
            name: user.name,
        }
    }

  }

}
