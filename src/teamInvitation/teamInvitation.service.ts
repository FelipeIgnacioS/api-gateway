import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { CreateTeamInvitationDto, GetInvitationsDto } from './dto';

@Injectable()
export class TeamInvitationService {
    private readonly microserviceBaseUrl = 'http://localhost:3003';

    constructor(private httpService: HttpService) {}

    createTeamInvitation(createTeamInvitationDto: CreateTeamInvitationDto) {
        console.log("entro: ",createTeamInvitationDto);
        return this.httpService.post(`${this.microserviceBaseUrl}/team-invitations/create-invitation`, createTeamInvitationDto)
                   .pipe(map(response => response.data))
                   .toPromise();
    }

    findAll(getInvitationsDto: GetInvitationsDto) {
        return this.httpService.get(`${this.microserviceBaseUrl}/team-invitations/get-invitations`, { params: getInvitationsDto })
                   .pipe(map(response => response.data))
                   .toPromise();
    }

    acceptInvitation(id: number) {
        console.log("entro: ", id);
        return this.httpService.patch(`${this.microserviceBaseUrl}/team-invitations/${id}/accept`, {})
                   .pipe(map(response => response.data))
                   .toPromise();
    }

    rejectInvitation(id: number) {
        return this.httpService.patch(`${this.microserviceBaseUrl}/team-invitations/${id}/reject`, {})
                   .pipe(map(response => response.data))
                   .toPromise();
    }

    cancelInvitation(id: number) {
        return this.httpService.patch(`${this.microserviceBaseUrl}/team-invitations/${id}/cancel`, {})
                   .pipe(map(response => response.data))
                   .toPromise();
    }

    resendInvitation(id: number) {
        return this.httpService.patch(`${this.microserviceBaseUrl}/team-invitations/${id}/resend`, {})
                   .pipe(map(response => response.data))
                   .toPromise();
    }

    deleteInvitation(id: number) {
        return this.httpService.delete(`${this.microserviceBaseUrl}/teamInvitation/${id}`)
                   .pipe(map(response => response.data))
                   .toPromise();
    }
}
