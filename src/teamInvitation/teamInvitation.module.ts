import { Module } from '@nestjs/common';
import { TeamInvitationController } from './teamInvitation.Controller';
import { TeamInvitationService } from './teamInvitation.service';
import { HttpModule } from '@nestjs/axios'; // Importa HttpModule para hacer solicitudes HTTP
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/jwt/jwt.strategy';

@Module({
  imports: [HttpModule,
    PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: 'futbolitos',
            signOptions: { expiresIn: '1h' },
        }),
    ], 
  controllers: [TeamInvitationController], 
  providers: [TeamInvitationService, JwtStrategy],
  exports: [PassportModule, JwtModule], 
})
export class TeamInvitationModule {}
