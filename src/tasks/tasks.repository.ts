import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Task } from '../../generated/prisma/client';

@Injectable()
export class TasksRepository {
  constructor(private prisma: PrismaService) {}

  async findOne(where: Prisma.TaskWhereUniqueInput): Promise<Task | null> {
    return this.prisma.task.findUnique({ where });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.TaskWhereUniqueInput;
    where?: Prisma.TaskWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<Task[]> {
    return this.prisma.task.findMany(params);
  }

  async create(data: Prisma.TaskCreateInput): Promise<Task> {
    return this.prisma.task.create({ data });
  }

  async update(params: {
    where: Prisma.TaskWhereUniqueInput;
    data: Prisma.TaskUpdateInput;
  }): Promise<Task> {
    return this.prisma.task.update(params);
  }

  async delete(where: Prisma.TaskWhereUniqueInput): Promise<Task> {
    return this.prisma.task.delete({ where });
  }
}
