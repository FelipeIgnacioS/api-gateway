import { Controller, Get, Put, Body, UseGuards, Request, Post, Param, Patch, Delete, UnauthorizedException, Req, Query } from '@nestjs/common';
import { TeamsService } from './teams.service';
import { JwtAuthGuard } from '../jwt/jwt-auth.guard';
import { AddMemberDto, UpdateMemberDto, CreateRoleDto, UpdateRoleDto, DeleteRoleDto, CreateTeamDto, UpdateTeamDto, DeleteTeamDto, DeleteMemberDto} from './dto';
import { log } from 'console';

@Controller('teams')
export class TeamsController {
    constructor(private readonly teamsService: TeamsService) {}

    @UseGuards(JwtAuthGuard)
    @Post('create-team')
    async create(@Request() req, @Body() createTeamDto: CreateTeamDto) {
        console.log("iniciando creacion de equipo");
        const userId = req.user.userId;
        createTeamDto.createdByUserId = userId;
        console.log("creando equipo: ", createTeamDto);
        return this.teamsService.createTeam(createTeamDto);
    }

    // Obtener todos los equipos
    @UseGuards(JwtAuthGuard)
    @Get('get-teams')
    findAll() {
        return this.teamsService.findAll();
    }

    // Obtener un equipo por ID
    @UseGuards(JwtAuthGuard)
    @Get('get-team/:id') 
    findOne(@Param('id') id: number) {
        console.log("id: ", id);
        return this.teamsService.findOne(id);
    }



    // Actualizar equipo
    @UseGuards(JwtAuthGuard)
    @Patch('update-team')
    update(@Body() updateTeamDto: UpdateTeamDto,@Request() req) {
        updateTeamDto.idUser = req.user.userId;
        return this.teamsService.update(updateTeamDto);
    }

    // Eliminar equipo
    @UseGuards(JwtAuthGuard)
    @Delete('delete-team')
    async remove(@Body() deleteTeamDto: DeleteTeamDto,@Request() req) {
        deleteTeamDto.idUser = req.user.userId;
        await this.teamsService.remove(deleteTeamDto);
        return { message: 'El equipo se ha eliminado correctamente.' };
    }

    // Obtener todos los equipos de un usuario
    @UseGuards(JwtAuthGuard)
    @Get('get-teams-user/me')
    async getTeamsUser(@Request() req) {
        const userId = req.user.userId;
        return this.teamsService.getTeamsUser(userId);
    }

    // Roles
    
    // Crear un rol
    @UseGuards(JwtAuthGuard)
    @Post('create-role')
    async createRole(@Body() createRoleDto: CreateRoleDto, @Request() req) {
        const userId = req.user.userId;
        createRoleDto.createdByUserId = userId;
        return this.teamsService.createRole(createRoleDto);
    }

    // Obtener todos los roles de un equipo más los roles base
    @UseGuards(JwtAuthGuard)
    @Get('get-role-team/:teamId')
    async getRoles(@Param('teamId') teamId: number) {
        return this.teamsService.getRolesTeams(teamId);
    }

    // Obtener todos los roles base
    @UseGuards(JwtAuthGuard)
    @Get('get-base-roles')
    async getBaseRoles() {
        return this.teamsService.getRoles(); // Obtener roles con team_id nulo
    }

    // Actualizar un rol
    @UseGuards(JwtAuthGuard)
    @Put('update-role/:id')
    async updateRole(@Param('id') id: number, @Body() updateRoleDto: UpdateRoleDto) {
        console.log("id: ", id);
        console.log("updateRoleDto: ", updateRoleDto);
        return this.teamsService.updateRole(id, updateRoleDto);
    }

    // Eliminar un rol
    @UseGuards(JwtAuthGuard)
    @Delete('delete-role')
    async deleteRole(@Body() deleteRole: DeleteRoleDto): Promise<void> {
        return this.teamsService.deleteRole(deleteRole);
    }

    // Members
    
    // Agregar un miembro a un equipo
    @UseGuards(JwtAuthGuard)
    @Post('add-member')
    async addMember(@Body() addMemberDto: AddMemberDto, @Request()req) {
        addMemberDto.userId = req.user.userId;
        return this.teamsService.addMember(addMemberDto);
    }

    // Obtener todos los miembros de un equipo
    @UseGuards(JwtAuthGuard)
    @Get('get-members/:teamId')
    async getMembers(@Param('teamId') teamId: number) {
        return this.teamsService.getMembers(teamId);
    }

    // Eliminar un miembro de un equipo
    @UseGuards(JwtAuthGuard)
    @Delete('delete-member')
    async deleteMember(@Body() deleteMember: DeleteMemberDto, @Request() req) {
        deleteMember.idUserProperity = req.user.userId;
        return this.teamsService.deleteMember(deleteMember);
    }

    // Actualizar un miembro de un equipo
    @UseGuards(JwtAuthGuard)
    @Put('update-member')
    async updateMember(@Body() updateMemberDto: UpdateMemberDto) {
        return this.teamsService.updateMember(updateMemberDto);
    }
}
