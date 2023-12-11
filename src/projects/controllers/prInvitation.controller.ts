import { Controller, Post, Get, Patch, Delete, Body, Param, Req, UseGuards } from '@nestjs/common';
import { CreateProjectInvitationDto, RespondInvitationDto } from '../dto/invitationPr';
import { PrInvitationService } from '../services/prInvitation.service';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller('project-invitations')
export class PrInvitationController {
    constructor(private prInvitationService: PrInvitationService) { }

    @UseGuards(JwtAuthGuard)
    @Post('create-invitation')
    async createInvitation(@Body() createInvitationDto: CreateProjectInvitationDto, @Req() req) {
        createInvitationDto.idUser = req.user.userId;
        return this.prInvitationService.createInvitation(createInvitationDto);
    }
    
    @UseGuards(JwtAuthGuard)
    @Patch('respond')
    async respondInvitation(@Body() respondInvitationDto: RespondInvitationDto, @Req() req) {
        respondInvitationDto.idUser = req.user.userId;
        return this.prInvitationService.respondInvitation(respondInvitationDto);
    }
    
    @UseGuards(JwtAuthGuard)
    @Get('project/:idProject')
    async getInvitationsOfProject(@Param('idProject') idProject: number) {
        return this.prInvitationService.getInvitationsOfProject(idProject);
    }
    
    @UseGuards(JwtAuthGuard)
    @Get('team/:codeTeam')
    async getInvitationsOfTeam(@Param('codeTeam') codeTeam: number) {
        return this.prInvitationService.getInvitationsOfTeam(codeTeam);
    }
}
