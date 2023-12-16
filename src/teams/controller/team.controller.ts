import { Body, Controller, Post, Get, Headers, Delete, UseGuards, Request, Put } from '@nestjs/common';
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';
import { TeamService } from '../service/team.service';
import { CreateTeamDto, UpdateTeamDto, DeleteTeamDto } from '../dto/team';

@Controller('teams')
export class TeamController {
    constructor(private teamService: TeamService) {}

    @UseGuards(JwtAuthGuard)
    @Post('create-team')
    async createTeam(@Request() req, @Body() createTeamDto: CreateTeamDto) {
        const userId = req.user.userId;
        createTeamDto.createdByUserId = userId;
        return this.teamService.createTeam(createTeamDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('get-teams')
    async getTeams() {
        return this.teamService.getTeams();
    }

    @UseGuards(JwtAuthGuard)
    @Get('get-team/:teamId')
    async getTeamId(@Request() req) {
        const teamId = req.params.teamId;
        return this.teamService.getTeamId(teamId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('get-team-code/:code')
    async getTeamCode(@Request() req) {
        const code = req.params.code;
        console.log(code);
        return this.teamService.getTeamCode(code);
    }

    @UseGuards(JwtAuthGuard)
    @Put('update-team')
    async updateTeam(@Request() req, @Body() updateTeamDto: UpdateTeamDto) {
        const userId = req.user.userId;
        updateTeamDto.idUser = userId;
        return this.teamService.updateTeam(updateTeamDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete-team')
    async deleteTeam(@Request() req, @Body() deleteTeamDto: DeleteTeamDto) {
        const userId = req.user.userId;
        deleteTeamDto.idUser = userId;
        return this.teamService.deleteTeam(deleteTeamDto);
    }
}