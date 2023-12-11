import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module'; 
import { TeamsModule } from './teams/teams.module';
import { ProjectModule } from './projects/proyect.module';
import { TaskModule } from './tasks/task.module';
@Module({
  imports: [AuthModule,TeamsModule, ProjectModule, TaskModule ],
})
export class AppModule {}
