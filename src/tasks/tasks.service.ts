import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Task } from '../../generated/prisma/client';
import { TasksRepository } from './tasks.repository';

@Injectable()
export class TasksService {
  constructor(private tasksrepository: TasksRepository) {}

  async getTaskById(id: Task['id']): Promise<Task> {
    const Task = await this.tasksrepository.findOne({ id });
    if (!Task) throw new NotFoundException(`Task #${id} not found`);
    return Task;
  }

  async getAllTasks(): Promise<Task[]> {
    return this.tasksrepository.findMany({});
  }

  async createTask(data: Prisma.TaskCreateInput): Promise<Task> {
    return this.tasksrepository.create(data);
  }

  async updateTask(
    id: Task['id'],
    data: Prisma.TaskUpdateInput,
  ): Promise<Task> {
    await this.getTaskById(id);
    return this.tasksrepository.update({ where: { id }, data });
  }

  async deleteTask(id: Task['id']): Promise<Task> {
    await this.getTaskById(id); // check exists first
    return this.tasksrepository.delete({ id });
  }
}
