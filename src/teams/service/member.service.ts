import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, map } from 'rxjs/operators';
import { AddMemberDto, UpdateMemberDto, DeleteMemberDto } from '../dto/member';

@Injectable()
export class MemberService {
    private readonly microserviceBaseUrl = 'http://localhost:3003/members';
    constructor(private httpService: HttpService) {}

    async addMember(addMemberDto: AddMemberDto) {
        return this.httpService.post(`${this.microserviceBaseUrl}/add-member`, addMemberDto )
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

    async getMembersTeam(id:number) {
        return this.httpService.get(`${this.microserviceBaseUrl}/get-members-team/${id}`)
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

    async updateMember(updateMemberDto: UpdateMemberDto) {
        return this.httpService.patch(`${this.microserviceBaseUrl}/update-member`, updateMemberDto )
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

    async deleteMember(deleteMemberDto: DeleteMemberDto) {
        return this.httpService.delete(`${this.microserviceBaseUrl}/delete-member`, { data: deleteMemberDto })
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

    async getTeamsUser(id:number) {
        return this.httpService.get(`${this.microserviceBaseUrl}/get-teams-user/${id}`)
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

    async leaveTeam(deleteMemberDto: DeleteMemberDto) {
        return this.httpService.delete(`${this.microserviceBaseUrl}/leave-team`, { data: deleteMemberDto })
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