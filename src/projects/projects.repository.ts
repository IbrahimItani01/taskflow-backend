import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { Prisma, Project } from '../../generated/prisma/client';

@Injectable()
export class ProjectsRepository {
  constructor(private prisma: PrismaService) {}

  async findOne(
    where: Prisma.ProjectWhereUniqueInput,
  ): Promise<Project | null> {
    return this.prisma.project.findUnique({ where });
  }

  async findMany(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.ProjectWhereUniqueInput;
    where?: Prisma.ProjectWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<Project[]> {
    return this.prisma.project.findMany(params);
  }

  async create(data: Prisma.ProjectCreateInput): Promise<Project> {
    return this.prisma.project.create({ data });
  }

  async update(params: {
    where: Prisma.ProjectWhereUniqueInput;
    data: Prisma.ProjectUpdateInput;
  }): Promise<Project> {
    return this.prisma.project.update(params);
  }

  async delete(where: Prisma.ProjectWhereUniqueInput): Promise<Project> {
    return this.prisma.project.delete({ where });
  }
}
