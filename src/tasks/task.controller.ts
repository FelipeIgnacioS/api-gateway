import { Controller, Get, Post, Patch, Delete, Body, Param, Query, UseGuards, Request } from '@nestjs/common';
import { TaskService } from './task.service';
import { CreateTaskDto, UpdateTaskDto, DeleteTaskDto, GetTasksDto, AddCommentDto } from "./dto";
import { JwtAuthGuard } from 'src/jwt/jwt-auth.guard';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/create-task')
  async createTask(@Request() req, @Body() createTaskDto: CreateTaskDto) {
    const userId = req.user.userId;
    createTaskDto.createdByUserId = userId;
    return this.taskService.createTask(createTaskDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/:id')
  async getTask(@Param('id') id: number) {
    return this.taskService.getTask(id);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  async getTasks(@Query() query: GetTasksDto, @Request() req) {
    query.userId = req.user.userId;
    return this.taskService.getTasks(query);
  }

  @UseGuards(JwtAuthGuard)
  @Get('get-tasks/:projectId')
  async getTasksOfProject(@Param('projectId') projectId: number) {
    return this.taskService.getTasksOfProject(projectId);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('/:id')
  async updateTask(@Request() req, @Param('id') id: number, @Body() updateTaskDto: UpdateTaskDto) {
    updateTaskDto.idUser = req.user.userId;
    updateTaskDto.idTask = id;
    return this.taskService.updateTask(updateTaskDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/delete')
  async deleteTask(@Request() req, @Body() deleteTaskDto: DeleteTaskDto) {
    deleteTaskDto.idUser = req.user.userId;
    return this.taskService.deleteTask(deleteTaskDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/createComment')
  async createComment(@Request() req, @Body() createCommentDto: AddCommentDto) {
    createCommentDto.createdByUserId = req.user.userId;
    return this.taskService.createComment(createCommentDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get('/getComments/:taskId')
  async getComments(@Param('taskId') taskId: number) {
    return this.taskService.getComments(taskId);
  }
}
