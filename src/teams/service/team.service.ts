import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, map } from 'rxjs/operators';
import { CreateTeamDto, UpdateTeamDto, DeleteTeamDto } from '../dto/team';

@Injectable()
export class TeamService{
    private readonly microserviceBaseUrl = 'http://localhost:3003/teams';
    constructor(private httpService: HttpService) {}

    async createTeam(createTeamDto: CreateTeamDto) {
        return this.httpService.post(`${this.microserviceBaseUrl}/create-team`, createTeamDto )
                .pipe(
                    map(response => response.data),
                    catchError(err => {
                        throw new HttpException(
                            {
                                status: err.response.status,
                                error: err.response.data
                            },
                            err.response.status
                        );
                    })
                )
               .toPromise();
    }

    async getTeams() {
        return this.httpService.get(`${this.microserviceBaseUrl}/get-teams`)
               .pipe(
                   map(response => response.data),
                   catchError(err => {
                       throw new HttpException(
                           {
                               status: err.response.status,
                               error: err.response.data
                           },
                           err.response.status
                       );
                   })
               )
               .toPromise();
    }

    async getTeamId(teamId: string) {
        return this.httpService.get(`${this.microserviceBaseUrl}/get-team/${teamId}`)
               .pipe(
                   map(response => response.data),
                   catchError(err => {
                       throw new HttpException(
                           {
                               status: err.response.status,
                               error: err.response.data
                           },
                           err.response.status
                       );
                   })
               )
               .toPromise();
    }

    async getTeamCode(teamCode: string) {
        return this.httpService.get(`${this.microserviceBaseUrl}/get-team-code/${teamCode}`)
               .pipe(
                   map(response => response.data),
                   catchError(err => {
                       throw new HttpException(
                           {
                               status: err.response.status,
                               error: err.response.data
                           },
                           err.response.status
                       );
                   })
               )
               .toPromise();
    }

    async updateTeam(updateTeamDto: UpdateTeamDto) {
        return this.httpService.patch(`${this.microserviceBaseUrl}/update-team`, updateTeamDto)
                .pipe(
                    map(response => response.data),
                    catchError(err => {
                        throw new HttpException(
                            {
                                status: err.response.status,
                                error: err.response.data
                            },
                            err.response.status
                        );
                    })
                )
               .toPromise();
    }

    async deleteTeam(deleteTeamDto: DeleteTeamDto) {
        return this.httpService.delete(`${this.microserviceBaseUrl}/delete-team`, { data: deleteTeamDto })
                .pipe(
                    map(response => response.data),
                    catchError(err => {
                        throw new HttpException(
                            {
                                status: err.response.status,
                                error: err.response.data
                            },
                            err.response.status
                        );
                    })
                )
               .toPromise();
    }

}