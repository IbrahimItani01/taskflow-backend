import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsRepository } from './projects.repository';

@Module({
  providers: [ProjectsService, ProjectsRepository],
})
export class ProjectsModule {}
