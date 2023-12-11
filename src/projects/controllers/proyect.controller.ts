import { Controller, Get, Post, Body, Param, Patch, Delete, UseGuards, Req, Put, UnauthorizedException } from '@nestjs/common';
import { ProyectService } from '../services/proyect.service';
import { CreateProjectDto, UpdateProjectDto, DeleteProjectDto} from '../dto/proyect';
import { JwtAuthGuard } from '../../jwt/jwt-auth.guard';

@Controller('projects')
export class ProjectController {
    constructor(private proyectService: ProyectService) {}

    @UseGuards(JwtAuthGuard)
    @Post('create-project')
    async createProyect(@Req() req, @Body() createProyectDto: CreateProjectDto) {
        const userId = req.user.userId;
        createProyectDto.createdByUserId = userId;
        return this.proyectService.createProyect(createProyectDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('get-project/:projectId')
    async getProyect(@Req() req) {
        const projectId = req.params.projectId;
        return this.proyectService.getProyect(projectId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('get-projects/:userId')
    async getProjects(@Req() req) {
        const proyectId = req.params.userId;
        return this.proyectService.getProjects(proyectId);
    }

    @UseGuards(JwtAuthGuard)
    @Get('get-proyects-owner/:userId')
    async getProyectsOwner(@Req() req) {
        const userId = req.params.userId;
        return this.proyectService.getProjectsOwner(userId);
    }

    @UseGuards(JwtAuthGuard)
    @Put('update-project')
    async updateProyect(@Req() req, @Body() updateProjectDto: UpdateProjectDto) {
        const userId = req.user.userId;
        updateProjectDto.createdByUserId = userId;
        return this.proyectService.updateProyect(updateProjectDto);
    }

    @UseGuards(JwtAuthGuard)
    @Delete('delete-project')
    async deleteProyect(@Req() req, @Body() deleteProjectDto: DeleteProjectDto) {
        const userId = req.user.userId;
        deleteProjectDto.idUser = userId;
        return this.proyectService.deleteProyect(deleteProjectDto);
    }

    @UseGuards(JwtAuthGuard)
    @Get('get-users/:projectId')
    async getUsers(@Req() req) {
        const projectId = req.params.projectId;
        return this.proyectService.getUsers(projectId);
    }
}
    
