import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'; 
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/jwt/jwt.strategy';
import { TeamController } from './controller/team.controller';
import { MemberController } from './controller/member.controller';
import { InvitationController } from './controller/invitation.controller';
import { TeamService } from './service/team.service';
import { MemberService } from './service/member.service';
import { InvitationService } from './service/invitation.service';


@Module({
  imports: [HttpModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: 'futbolitos',
            signOptions: { expiresIn: '10h' },
        }),
    ], 
  controllers: [TeamController, MemberController, InvitationController], 
  providers: [TeamService, JwtStrategy, MemberService, InvitationService],
  exports: [PassportModule, JwtModule], 
})
export class TeamsModule {}
