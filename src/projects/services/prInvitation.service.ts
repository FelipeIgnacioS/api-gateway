import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, map } from 'rxjs/operators';
import { CreateProjectInvitationDto, RespondInvitationDto } from '../dto/invitationPr';

@Injectable()
export class PrInvitationService {
    private readonly microserviceBaseUrl = 'http://localhost:3003/project-invitations';
    constructor(private httpService: HttpService) { }

    async createInvitation(createInvitationDto: CreateProjectInvitationDto) {
        return this.httpService.post(`${this.microserviceBaseUrl}/create-invitation`, createInvitationDto)
            .pipe(map(response => response.data), catchError(err => {
                throw new HttpException({
                    status: err.response.status,
                    error: err.response.data
                }, err.response.status);
            })).toPromise();
    }

    async respondInvitation(respondInvitationDto: RespondInvitationDto) {
        return this.httpService.patch(`${this.microserviceBaseUrl}/respond`, respondInvitationDto)
            .pipe(map(response => response.data), catchError(err => {
                throw new HttpException({
                    status: err.response.status,
                    error: err.response.data
                }, err.response.status);
            })).toPromise();
    }

    async getInvitationsOfProject(idProject: number) {
        return this.httpService.get(`${this.microserviceBaseUrl}/project/${idProject}`)
            .pipe(map(response => response.data), catchError(err => {
                throw new HttpException({
                    status: err.response.status,
                    error: err.response.data
                }, err.response.status);
            })).toPromise();
    }

    async getInvitationsOfTeam(codeTeam: number) {
        return this.httpService.get(`${this.microserviceBaseUrl}/team/${codeTeam}`)
            .pipe(map(response => response.data), catchError(err => {
                throw new HttpException({
                    status: err.response.status,
                    error: err.response.data
                }, err.response.status);
            })).toPromise();
    }
}