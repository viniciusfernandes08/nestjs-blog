import { Injectable } from '@nestjs/common';
import { LoginDto } from './dto/login.dto';

@Injectable()
export class AuthService {
  loginService(loginDto: LoginDto) {
    return loginDto.password;
  }
}
