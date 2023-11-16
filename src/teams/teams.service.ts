import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map } from 'rxjs/operators';
import { 
    CreateTeamDto, 
    UpdateTeamDto, 
    DeleteTeamDto, 
    CreateRoleDto, 
    UpdateRoleDto, 
    DeleteRoleDto, 
    AddMemberDto, 
    DeleteMemberDto, 
    UpdateMemberDto 
} from './dto';

@Injectable()
export class TeamsService {
  private readonly microserviceBaseUrl = 'http://localhost:3003'; // Asumiendo que este es el puerto de tu microservicio

  constructor(private httpService: HttpService) {}

  createTeam(createTeamDto: CreateTeamDto) {
    return this.httpService.post(`${this.microserviceBaseUrl}/teams/create-team`, createTeamDto)
               .pipe(map(response => response.data))
               .toPromise();
  }

  findAll() {
    return this.httpService.get(`${this.microserviceBaseUrl}/teams/get-teams`)
               .pipe(map(response => response.data))
               .toPromise();
  }

  findOne(id: number) {
    console.log("id: ", id);
    return this.httpService.get(`${this.microserviceBaseUrl}/teams/get-team/${id}`)
               .pipe(map(response => response.data))
               .toPromise();
  }

  update(updateTeamDto: UpdateTeamDto) {
    return this.httpService.patch(`${this.microserviceBaseUrl}/teams/update-team`, updateTeamDto)
               .pipe(map(response => response.data))
               .toPromise();
  }

  remove(deleteTeamDto: DeleteTeamDto) {
    return this.httpService.delete(`${this.microserviceBaseUrl}/teams/delete-team`, { data: deleteTeamDto })
               .pipe(map(response => response.data))
               .toPromise();
  }

  getTeamsUser(userId: number) {
    console.log("userId: ", userId);
    return this.httpService.get(`${this.microserviceBaseUrl}/teams/get-teams-user/${userId}`)
               .pipe(map(response => response.data))
               .toPromise();
  }

  // Métodos para roles

  createRole(createRoleDto: CreateRoleDto) {
    return this.httpService.post(`${this.microserviceBaseUrl}/teams/create-rol`, createRoleDto)
               .pipe(map(response => response.data))
               .toPromise();
  }

  getRolesTeams(teamId: number) {
    return this.httpService.get(`${this.microserviceBaseUrl}/teams/get-role-team/${teamId}`)
               .pipe(map(response => response.data))
               .toPromise();
  }

  getRoles() {
    return this.httpService.get(`${this.microserviceBaseUrl}/teams/get-base-roles`)
               .pipe(map(response => response.data))
               .toPromise();
  }

  updateRole(id: number, updateRoleDto: UpdateRoleDto) {
    return this.httpService.put(`${this.microserviceBaseUrl}/teams/update-role/${id}`, updateRoleDto)
               .pipe(map(response => response.data))
               .toPromise();
  }

  deleteRole(deleteRoleDto: DeleteRoleDto) {
    return this.httpService.delete(`${this.microserviceBaseUrl}/teams/delete-role`, { data: deleteRoleDto })
               .pipe(map(response => response.data))
               .toPromise();
  }

  // Métodos para miembros

  addMember(addMemberDto: AddMemberDto) {
    return this.httpService.post(`${this.microserviceBaseUrl}/teams/add-member`, addMemberDto)
               .pipe(map(response => response.data))
               .toPromise();
  }

  getMembers(teamId: number) {
    return this.httpService.get(`${this.microserviceBaseUrl}/teams/get-members/${teamId}`)
               .pipe(map(response => response.data))
               .toPromise();
  }

  deleteMember(deleteMemberDto: DeleteMemberDto) {
    return this.httpService.delete(`${this.microserviceBaseUrl}/teams/delete-member`, { data: deleteMemberDto })
               .pipe(map(response => response.data))
               .toPromise();
  }

  updateMember(updateMemberDto: UpdateMemberDto) {
    return this.httpService.put(`${this.microserviceBaseUrl}/teams/update-member`, updateMemberDto)
               .pipe(map(response => response.data))
               .toPromise();
  }
}
