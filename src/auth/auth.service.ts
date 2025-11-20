import { Injectable } from '@nestjs/common';

@Injectable()
export class AuthService {
  loginService() {
    return 'Hello from AuthService';
  }
}
