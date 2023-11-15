import { Body, Controller, Post, Get, Headers, Delete, UseGuards, Request } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto, LoginUserDto, RequestPasswordResetDto, ResetPasswordDto, UpdateUserDto, ChangePassword } from './dto'; 
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @Post('login')
  async login(@Body() loginUserDto: LoginUserDto) {
    return this.authService.login(loginUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('logout')
  async logout(@Headers('Authorization') authHeader: string) {
    const token = authHeader.split(' ')[1]; 
    return this.authService.logout(token);
  }

  @UseGuards(JwtAuthGuard)
  @Post('change-password')
  async changePassword(@Request() req, @Body() changePasswordDto: ChangePassword) {
    const userId = req.user.userId; 
    changePasswordDto.id = userId;
    return this.authService.changePassword(changePasswordDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('me')
  async getUser(@Request() req) {
    const userId = req.user.userId; 
    return this.authService.getUser(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('me')
  async deleteUser(@Request() req) {
    const userId = req.user.userId; 
    return this.authService.deleteUser(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Post('update')
  async updateUser(@Request() req, @Body() updateUserDto: UpdateUserDto) {
    const userId = req.user.userId;
    return this.authService.updateUser({...updateUserDto, userId});
  }

  @Post('request-password-reset')
  async requestPasswordReset(@Body() requestPasswordResetDto: RequestPasswordResetDto) {
    return this.authService.requestPasswordReset(requestPasswordResetDto);
  }

  @Post('reset-password')
  async resetPassword(@Body() resetPasswordDto: ResetPasswordDto) {
    return this.authService.resetPassword(resetPasswordDto);
  }
}
