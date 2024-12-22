// src/auth/auth.service.ts
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  // Method to generate a JWT for the user
  async login(user: { username: string }): Promise<{ access_token: string }> {
    const payload = { username: user.username }; // The payload can contain more details
    const access_token = this.jwtService.sign(payload);
    return { access_token };
  }

  // Dummy validation for the single user (replace with a proper database check in real app)
  async validateUser(username: string): Promise<any> {
    if (username === 'testuser') {
      return { username }; // Return the user object
    }
    return null;
  }
}
