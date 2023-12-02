import { IsEmail, IsNotEmpty, IsString, MinLength, IsInt, IsOptional } from 'class-validator';

export class ChangePassword{
    @IsNotEmpty()
    id: number;

    @IsNotEmpty()
    @IsString()
    password: string;

    @IsNotEmpty()
    @IsString()
    @MinLength(6)
    newPassword: string;
}

export class CreateUserDto {
    @IsNotEmpty()
    @IsString()
    first_name: string;
  
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    password: string;
}

export class LoginUserDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;
  
    @IsNotEmpty()
    @IsString()
    password: string;
}

export class LoginResponseDto {
    accessToken: string;
    expiresIn: Date;
}

export class ResetPasswordDto {
    @IsNotEmpty()
    @IsString()
    token: string;
  
    @IsNotEmpty()
    @IsString()
    @MinLength(8)
    newPassword: string;
  }
  
  export class UpdateUserDto {
    @IsNotEmpty()
    @IsInt()
    userId: number;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsOptional()
    @IsString()
    nickname: string;

    @IsOptional()
    @IsString()
    first_name: string;

    @IsOptional()
    @IsString()
    last_name: string;

    @IsOptional()
    @IsString()
    job_position: string;

    @IsOptional()
    @IsString()
    location: string;

    @IsOptional()
    @IsString()
    profile_picture: string;

    @IsOptional()
    @IsString()
    contact: string;
}


export class RequestPasswordResetDto {
    @IsNotEmpty()
    @IsEmail()
    email: string;
  }
  