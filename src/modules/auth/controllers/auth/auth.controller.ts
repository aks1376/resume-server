import { Controller, Post, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AuthService } from '../../services/auth/auth.service';
import { LoginDto } from '../../models/login-dto';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) { }

  @Post('login')
  login(@Body() login: LoginDto) {    
    return this.authService.login(login);
  }
}
