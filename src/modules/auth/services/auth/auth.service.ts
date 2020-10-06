import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { LoginDto } from '../../models/login-dto';
import { UsersService } from './../../../../modules/users/services/users.service';

@Injectable()
export class AuthService {

  constructor(private usersService: UsersService, private jwtService: JwtService) { }

  async validateUser(email, password) {
    const user = await this.usersService.findByEmail(email);
    if (user && user.password && user.password === password) {
      delete user.password;
      return user;
    }
    return null;
  }

  async login(login: LoginDto) {
    const user = await this.validateUser(login.email, login.password);
    if (!user) {
      throw new UnauthorizedException('email or password is incorrect');
    }
    const payload = { email: user.email, id: user._id, role: user.role };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
