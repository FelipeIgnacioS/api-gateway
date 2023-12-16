import { HttpException, Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { catchError, map } from 'rxjs/operators';
import { CreateTaskDto, UpdateTaskDto, DeleteTaskDto, GetTasksDto, AddCommentDto } from './dto';

@Injectable()
export class TaskService {
    private readonly microserviceBaseUrl = 'http://localhost:3003/tasks';

    constructor(private httpService: HttpService) {}

    async createTask(createTaskDto: CreateTaskDto) {
        return this.httpService.post(`${this.microserviceBaseUrl}/create-task`, createTaskDto)
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

    async getTask(id:number) {
        return this.httpService.get(`${this.microserviceBaseUrl}/${id}`)
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

    async getTasks(query: GetTasksDto) {
        const queryParams = new URLSearchParams(query as any).toString();
    
        return this.httpService.get(`${this.microserviceBaseUrl}?${queryParams}`)
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

    async updateTask(updateTaskDto: UpdateTaskDto) {
        return this.httpService.patch(`${this.microserviceBaseUrl}/update-task`, updateTaskDto)
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

    async deleteTask(deleteTaskDto: DeleteTaskDto) {
        return this.httpService.delete(`${this.microserviceBaseUrl}/delete`, { data: deleteTaskDto })
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

    async getTasksOfProject(projectId: number){
        return this.httpService.get(`${this.microserviceBaseUrl}/get-tasks/${projectId}`)
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

    async createComment(createCommentDto: AddCommentDto) {
        return this.httpService.post(`${this.microserviceBaseUrl}/createComment`, createCommentDto)
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

    async getComments(taskId: number){
        return this.httpService.get(`${this.microserviceBaseUrl}/getComments/${taskId}`)
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