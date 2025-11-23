import { compare, genSalt, hash } from 'bcryptjs';
import { HashingService } from './hashing.service';

export class BcryptHashService extends HashingService {
  async hash(password: string): Promise<string> {
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);
    return hashedPassword;
  }

  async compare(password: string, hash: string): Promise<boolean> {
    const isValid = await compare(password, hash);
    return isValid;
  }
}
