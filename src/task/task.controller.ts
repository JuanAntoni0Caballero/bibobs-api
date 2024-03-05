import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { ApiTags, ApiResponse } from '@nestjs/swagger';
import { TaskDTO } from './task.dto';
import { TaskService } from './task.service';

@Controller('tasks')
@ApiTags('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Get()
  @ApiResponse({
    status: 200,
    description: 'List of tasks',
    type: TaskDTO,
    isArray: true,
  })
  findAll(): TaskDTO[] {
    return this.taskService.findAll();
  }

  @Post()
  @ApiResponse({
    status: 201,
    description: 'The task has been successfully created',
    type: TaskDTO,
  })
  create(@Body() taskDTO: TaskDTO): TaskDTO {
    return this.taskService.create(taskDTO);
  }

  @Put(':id/completed')
  @ApiResponse({
    status: 200,
    description: 'The task has been marked as completed',
    type: TaskDTO,
  })
  markAsCompleted(@Param('id') id: number): TaskDTO {
    return this.taskService.markAsCompleted(id);
  }
}
