// src/auth/jwt.strategy.ts
import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {  // 'jwt' is the strategy name
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(), // Extract JWT from Authorization header
      ignoreExpiration: false, // JWT will expire if not validated
      secretOrKey: process.env.JWT_SECRET || 'secret', // Secret key for JWT signing
    });
  }

  async validate(payload: any) {
    // Here you can check the validity of the user based on payload
    return this.authService.validateUser(payload.username);
  }
}

