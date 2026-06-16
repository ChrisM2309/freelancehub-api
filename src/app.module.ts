import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ServicesModule } from './services/services.module';
import { AuthModule } from './auth/auth.module';
import { PublicController } from './public/public.controller';

@Module({
  imports: [UsersModule, ServicesModule, AuthModule],
  controllers: [AppController, PublicController],
  providers: [AppService],
})
export class AppModule {}
