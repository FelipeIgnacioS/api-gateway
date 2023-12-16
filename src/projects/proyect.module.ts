import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'; 
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/jwt/jwt.strategy';
import { ProjectController } from './controllers/proyect.controller';
import { PrTeamController } from './controllers/prTeam.controller';
import { PrInvitationController } from './controllers/prInvitation.controller';
import { ProyectService } from './services/proyect.service';
import { PrTeamService } from './services/prTeam.service';
import { PrInvitationService } from './services/prInvitation.service';

@Module({
    imports: [HttpModule,
      PassportModule.register({ defaultStrategy: 'jwt' }),
          JwtModule.register({
              secret: 'futbolitos',
              signOptions: { expiresIn: '10h' },
          }),
      ], 
    controllers: [ProjectController, PrTeamController, PrInvitationController], 
    providers: [ProyectService, JwtStrategy, PrTeamService, PrInvitationService],
    exports: [PassportModule, JwtModule], 
  })
  export class ProjectModule {}