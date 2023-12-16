import { AssignTeamToProjectDto, GetTeamsOfProyectDto, RemoveTeamFromProjectDto } from '../dto/prTeam';
import { Controller, Get, Post, Body, Param, Patch, Delete, Req, UseGuards } from '@nestjs/common';
import { PrTeamService } from '../services/prTeam.service';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { get } from 'http';

@Controller('project-team')
export class PrTeamController {
    constructor(private prTeamService: PrTeamService) { }
    
    @UseGuards(JwtAuthGuard)
    @Post('assign-team')
    async assignTeamToProject(@Body() assignTeamToProjectDto: AssignTeamToProjectDto) {
        return this.prTeamService.assignTeamToProject(assignTeamToProjectDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('teams/:idProject')
    async getTeamsOfProyect(@Param() getTeamsOfProyectDto: GetTeamsOfProyectDto) {

        console.log("getTeamsOfProyectDto", getTeamsOfProyectDto.idProject);
        return this.prTeamService.getTeamsOfProyect(getTeamsOfProyectDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('projects/:teamId')
    async getProjectsOfTeam(@Param() teamId) {
        return this.prTeamService.getProjectsOfTeam(teamId);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('remove-team')
    async removeTeamFromProject(@Body() removeTeamFromProjectDto: RemoveTeamFromProjectDto, @Req() req) {
        removeTeamFromProjectDto.idUser = req.user.userId;
        return this.prTeamService.removeTeamFromProject(removeTeamFromProjectDto);
    }
}