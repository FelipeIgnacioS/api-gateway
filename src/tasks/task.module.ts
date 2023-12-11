import { Module } from '@nestjs/common';
import { HttpModule } from '@nestjs/axios'; 
import { PassportModule } from '@nestjs/passport';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from 'src/jwt/jwt.strategy';
import { TaskController } from './task.controller';
import { TaskService } from './task.service';

@Module({
    imports: [HttpModule,
      PassportModule.register({ defaultStrategy: 'jwt' }),
          JwtModule.register({
              secret: 'futbolitos',
              signOptions: { expiresIn: '1h' },
          }),
      ], 
    controllers: [TaskController], 
    providers: [TaskService, JwtStrategy],
    exports: [PassportModule, JwtModule], 
  })
  export class TaskModule {}