import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsRepository } from './projects.repository';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  providers: [ProjectsService, ProjectsRepository, PrismaService],
})
export class ProjectsModule {}
