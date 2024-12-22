// src/auth/auth.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose'; // Import MongooseModule
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt.strategy';
import { UserSchema } from './user.schema'; // Import User schema

@Module({
  imports: [
    // Register User model
    MongooseModule.forFeature([{ name: 'User', schema: UserSchema }]),
    // Configure JwtModule
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'secret', // Use environment variable for secret
      signOptions: { expiresIn: '1h' }, // Token expiration time
    }),
  ],
  providers: [AuthService, JwtStrategy], // Register AuthService and JwtStrategy
  controllers: [AuthController],
  exports: [AuthService], // Export AuthService to make it available in other modules
})
export class AuthModule {}
