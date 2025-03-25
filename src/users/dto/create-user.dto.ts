import { IsEmail, IsEnum, IsString, IsBoolean } from 'class-validator';
import { UserRole } from '../entities/user.entity';

export class CreateUserDto {
  @IsString()
  name: string;

  @IsEmail()
  email: string;

  @IsString()
  password: string;

  @IsEnum(UserRole)
  role?: UserRole;

  @IsBoolean()
  test_subject_status?: boolean;

  @IsString()
  allergic_reactions?: string;
}



