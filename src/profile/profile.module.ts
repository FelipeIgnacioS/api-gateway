import { Module } from '@nestjs/common';
import { ProfileController } from './profile.controller';
import { ProfileService } from './profile.service';
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
  controllers: [ProfileController], 
  providers: [ProfileService, JwtStrategy],
  exports: [PassportModule, JwtModule], 
})
export class ProfileModule {}
