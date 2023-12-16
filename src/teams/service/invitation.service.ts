import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, map } from 'rxjs/operators';
import { CreateTeamInvitationDto } from '../dto/invitation';

@Injectable()
export class InvitationService {
    private readonly microserviceBaseUrl = 'http://localhost:3003/team-invitations';
    constructor(private httpService: HttpService) {}

    async createInvitation(createTeamInvitationDto: CreateTeamInvitationDto) {
        return this.httpService.post(`${this.microserviceBaseUrl}/create-invitation`, createTeamInvitationDto )
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

    async getInvitations(userId: number) {
        return this.httpService.get(`${this.microserviceBaseUrl}/get-invitations`, {
            params: { id: userId }
        })
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
    

    async acceptInvitation(invitationId: number) {
        return this.httpService.patch(`${this.microserviceBaseUrl}/${invitationId}/accept`, {})
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

    async rejectInvitation(invitationId: number) {
        return this.httpService.patch(`${this.microserviceBaseUrl}/${invitationId}/reject`, {})
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

    async cancelInvitation(invitationId: number) {
        return this.httpService.patch(`${this.microserviceBaseUrl}/${invitationId}/cancel`, {})
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