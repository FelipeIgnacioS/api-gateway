import { Module } from '@nestjs/common';
import { JwtModule as NestJwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    NestJwtModule.register({
      secret: process.env.JWT_SECRET, 
      signOptions: { expiresIn: '10h' }, 
    }),
  ],
  exports: [NestJwtModule],
})
export class JwtModule {}
