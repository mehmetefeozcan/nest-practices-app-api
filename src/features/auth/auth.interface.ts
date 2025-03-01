import { Expose } from 'class-transformer';
import { IsString, IsEmail, IsNumber } from 'class-validator';

export class SignInInterface {
  @IsNumber()
  @Expose()
  id!: number;

  @IsEmail()
  @Expose()
  email!: string;

  @IsString()
  @Expose()
  name!: string;
}
