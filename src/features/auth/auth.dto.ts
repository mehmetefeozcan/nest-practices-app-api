import { IsString, IsNotEmpty, IsEmail, Length } from 'class-validator';

export class SignUpDto {
  @IsString()
  @IsNotEmpty()
  name!: string;

  @IsEmail()
  @IsNotEmpty()
  email!: string;

  @Length(8)
  @IsNotEmpty()
  password!: string;
}
