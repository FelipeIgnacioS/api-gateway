import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module'; 
import { ProfileModule } from './profile/profile.module';
import { TeamsModule } from './teams/teams.module';
@Module({
  imports: [AuthModule, ProfileModule,TeamsModule ],
})
export class AppModule {}
