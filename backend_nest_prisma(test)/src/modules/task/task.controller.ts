import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { TaskService } from './task.service';
import { Task } from '@prisma/client';

@Controller('tasks')
export class TaskController {
  constructor(private readonly taskService: TaskService) {}

  @Post()
  async createTask(
    @Body() taskData: { title: string; description?: string },
  ): Promise<Task> {
    return this.taskService.createTask(taskData);
  }

  @Get()
  async getAllTasks(): Promise<Task[]> {
    return this.taskService.getAllTasks();
  }

  @Get(':id')
  async getTaskById(@Param('id') id: number): Promise<Task> {
    return this.taskService.getTaskById(Number(id));
  }

  @Put(':id')
  async updateTask(
    @Param('id') id: number,
    @Body() updateData: { title?: string; description?: string },
  ): Promise<Task> {
    return this.taskService.updateTask(Number(id), updateData);
  }

  @Delete(':id')
  async deleteTask(@Param('id') id: number): Promise<Task> {
    return this.taskService.deleteTask(Number(id));
  }
}
