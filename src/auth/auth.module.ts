import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { HttpModule } from '@nestjs/axios';
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/jwt/jwt.strategy';

@Module({
    imports: [HttpModule,
        PassportModule.register({ defaultStrategy: 'jwt' }),
        JwtModule.register({
            secret: 'futbolitos',
            signOptions: { expiresIn: '10h' },
        }),
        ],
    controllers: [AuthController],
    providers: [AuthService, JwtStrategy], 
    exports: [PassportModule, JwtModule],
})
export class AuthModule {}
