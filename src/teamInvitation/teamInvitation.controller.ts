import { Controller, Get, Put, Body, UseGuards, Request, Post, Patch, Param, Delete } from '@nestjs/common';
import { TeamInvitationService } from './teamInvitation.service';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { CreateTeamInvitationDto, GetInvitationsDto } from './dto';

@Controller('teamInvitation')
export class TeamInvitationController{
    constructor(private readonly teamInvitationService: TeamInvitationService) {}

    @UseGuards(JwtAuthGuard)
    @Post('create-invitation')
    async create(@Request() req, @Body() createTeamInvitationDto: CreateTeamInvitationDto) {
        console.log("entro: ",createTeamInvitationDto);
        return this.teamInvitationService.createTeamInvitation(createTeamInvitationDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('get-invitations')
    async findAll(@Body() getInvitationsDto: GetInvitationsDto) {
        return this.teamInvitationService.findAll(getInvitationsDto);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id/accept')
    async accept(@Param('id') id: number) {
        return this.teamInvitationService.acceptInvitation(id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id/reject')
    async reject(@Param('id') id: number) {
        return this.teamInvitationService.rejectInvitation(id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id/cancel')
    async cancel(@Param('id') id: number) {
        return this.teamInvitationService.cancelInvitation(id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id/resend')
    async resend(@Param('id') id: number) {
        return this.teamInvitationService.resendInvitation(id);
    }

    @UseGuards(JwtAuthGuard)
    @Delete(':id')
    async delete(@Param('id') id: number) {
        return this.teamInvitationService.deleteInvitation(id);
    }
    
}