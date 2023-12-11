import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, map } from 'rxjs/operators';
import { CreateProjectDto, UpdateProjectDto, DeleteProjectDto} from '../dto/proyect';
@Injectable()
export class ProyectService{
    private readonly microserviceBaseUrl = 'http://localhost:3003/projects';
    constructor(private httpService: HttpService) {}

    async createProyect(createProyectDto: CreateProjectDto) {
        return this.httpService.post(`${this.microserviceBaseUrl}/create-project`, createProyectDto )
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

    async getProyect(id:number) {
        return this.httpService.get(`${this.microserviceBaseUrl}/get-proyect/${id}`)
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

    async getProjects(proyectId: string) {
        return this.httpService.get(`${this.microserviceBaseUrl}/get-proyects/${proyectId}`)
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

    async getProjectsOwner(ownerId: number) {
        return this.httpService.get(`${this.microserviceBaseUrl}/get-proyects-owner/${ownerId}`)
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

    async updateProyect(updateProyectDto: UpdateProjectDto) {
        return this.httpService.patch(`${this.microserviceBaseUrl}/update-project`, updateProyectDto )
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

    async deleteProyect(deleteProyectDto: DeleteProjectDto) {
        return this.httpService.delete(`${this.microserviceBaseUrl}/delete-project`, {data: deleteProyectDto})
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

    async getUsers(idProject: number){
        return this.httpService.get(`${this.microserviceBaseUrl}/get-users/${idProject}`)
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