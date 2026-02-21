import { Injectable, NotFoundException } from '@nestjs/common';
import { Prisma, Project } from '../../generated/prisma/client';
import { ProjectsRepository } from './projects.repository';

@Injectable()
export class ProjectsService {
  constructor(private projectsrepository: ProjectsRepository) {}

  async getProjectById(id: Project['id']): Promise<Project> {
    const project = await this.projectsrepository.findOne({ id });
    if (!project) throw new NotFoundException(`Project #${id} not found`);
    return project;
  }

  async getAllProjects(): Promise<Project[]> {
    return this.projectsrepository.findMany({});
  }

  async createProject(data: Prisma.ProjectCreateInput): Promise<Project> {
    return this.projectsrepository.create(data);
  }

  async updateProject(
    id: Project['id'],
    data: Prisma.ProjectUpdateInput,
  ): Promise<Project> {
    await this.getProjectById(id);
    return this.projectsrepository.update({ where: { id }, data });
  }

  async deleteProject(id: Project['id']): Promise<Project> {
    await this.getProjectById(id); // check exists first
    return this.projectsrepository.delete({ id });
  }
}
