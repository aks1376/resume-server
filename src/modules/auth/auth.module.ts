import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './services/auth/auth.service';
import { JwtModule } from '@nestjs/jwt';
import { UsersModule } from '../users/users.module';
import { AuthController } from './controllers/auth/auth.controller';
import { JwtStrategy } from './services/jwt-strategy/jwt-strategy';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  controllers: [
    AuthController
  ],
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => ({
        secret: configService.get<string>('SECRET'),
        signOptions: { expiresIn: '3600s' },
      }),
      inject: [ConfigService]
    })
  ],
  providers: [
    AuthService,
    JwtStrategy
  ],
  exports: [
    JwtModule,
    AuthService
  ]
})
export class AuthModule { }
