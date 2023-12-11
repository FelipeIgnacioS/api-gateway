import { Body, Controller, Post, Get, Headers, Delete, UseGuards, Request, Put, Patch } from '@nestjs/common';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { InvitationService } from '../service/invitation.service';
import { CreateTeamInvitationDto } from '../dto/invitation';

@Controller('invitation')
export class InvitationController {
    constructor(private invitationService: InvitationService) {}

    @UseGuards(JwtAuthGuard)
    @Post('create-invitation')
    async createInvitation(@Request() req, @Body() createTeamInvitationDto: CreateTeamInvitationDto) {
        const userId = req.user.userId;
        createTeamInvitationDto.userId = userId;
        return this.invitationService.createInvitation(createTeamInvitationDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('get-invitations')
    async getInvitations(@Request() req) {
        const userId = req.user.userId;
        return this.invitationService.getInvitations(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id/accept')
    async acceptInvitation(@Request() req) {
        const id = req.params.id;
        return this.invitationService.acceptInvitation(id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id/reject')
    async rejectInvitation(@Request() req) {
        const id = req.params.id;
        return this.invitationService.rejectInvitation(id);
    }

    @UseGuards(JwtAuthGuard)
    @Patch(':id/cancel')
    async cancelInvitation(@Request() req) {
        const id = req.params.id;
        return this.invitationService.cancelInvitation(id);
    }

}