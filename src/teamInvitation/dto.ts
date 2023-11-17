export class CreateTeamInvitationDto{
    teamId: number;
    invitedUserId: number;
    status: string;
    invitationDate: Date;
}

export class GetInvitationsDto{
    teamId: number;
    userId: number;
    status: string;
}
