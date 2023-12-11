import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, map } from 'rxjs/operators';
import { AssignTeamToProjectDto, GetTeamsOfProyectDto, RemoveTeamFromProjectDto } from '../dto/prTeam';
@Injectable()
export class PrTeamService {
    private readonly microserviceBaseUrl = 'http://localhost:3003/project-team';
    constructor(private httpService: HttpService) { }

    async assignTeamToProject(assignTeamToProjectDto: AssignTeamToProjectDto) {
        return this.httpService.post(`${this.microserviceBaseUrl}/assign-team`, assignTeamToProjectDto)
            .pipe(map(response => response.data), catchError(err => {
            throw new HttpException({
                status: err.response.status,
                error: err.response.data
            }, err.response.status);
        })).toPromise();
    }

    async getTeamsOfProyect(getTeamsOfProyectDto: GetTeamsOfProyectDto) {
        return this.httpService.get(`${this.microserviceBaseUrl}/teams/${getTeamsOfProyectDto.idProject}`)
            .pipe(map(response => response.data), catchError(err => {
            throw new HttpException({
                status: err.response.status,
                error: err.response.data
            }, err.response.status);
        })).toPromise();
    }

    async getProjectsOfTeam(getProjectsOfTeamDto) {
        return this.httpService.get(`${this.microserviceBaseUrl}/projects/${getProjectsOfTeamDto.idTeam}`)
            .pipe(map(response => response.data), catchError(err => {
            throw new HttpException({
                status: err.response.status,
                error: err.response.data
            }, err.response.status);
        })).toPromise();
    }

    async removeTeamFromProject(removeTeamFromProjectDto: RemoveTeamFromProjectDto) {
        return this.httpService.delete(`${this.microserviceBaseUrl}/remove-team`, { data: removeTeamFromProjectDto })
            .pipe(map(response => response.data), catchError(err => {
            throw new HttpException({
                status: err.response.status,
                error: err.response.data
            }, err.response.status);
        })).toPromise();
    }
}