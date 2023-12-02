import { Controller, Get, Put, Body, UseGuards, Request } from '@nestjs/common';
import { ProfileService } from './profile.service';
import { updateProfileDto } from './dto'; // Asegúrate de que el nombre del DTO es correcto
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';

@Controller('profiles')
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @UseGuards(JwtAuthGuard)
  @Get('me') 
  async getProfile(@Request() req) {
    const userId = req.user.userId;
    console.log("Entro al profile y envia:", userId);
    return this.profileService.getProfile(userId);
  }

  @UseGuards(JwtAuthGuard)
  @Put('me') 
  async updateProfile(@Request() req, @Body() updateProfileDto: updateProfileDto) {
    const userId = req.user.userId; // El ID del usuario se extrae del token
    return this.profileService.updateProfile(userId, updateProfileDto);
  }
}
