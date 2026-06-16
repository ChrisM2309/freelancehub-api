import { ApiProperty } from '@nestjs/swagger';
import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
    // correo para login
    @ApiProperty({
        example: 'test@correo.com',
        description: 'User email',
    })
    @IsEmail()
    email: string;

    // contra para login 
    @ApiProperty({
        example: 'password123',
        description: 'User password',
    })
    @IsString()
    @IsNotEmpty()
    password: string;
}
