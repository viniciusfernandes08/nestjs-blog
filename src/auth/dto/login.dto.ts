import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail({}, { message: 'E-mail inválido' })
  email: string;

  @IsString({ message: 'Senha inválida' })
  @IsNotEmpty({ message: 'Senha não pode ser vazia' })
  password: string;
}
