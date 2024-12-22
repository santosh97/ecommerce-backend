// src/auth/auth.controller.ts
import { Controller, Post, Body, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Endpoint for login (to generate a JWT token)
  @Post('login')
  async login(@Body() user: { username: string }) {
    return this.authService.login(user);
  }

  // Example of a secured endpoint
  @Post('secure')
  @UseGuards(JwtAuthGuard) // Protect this route with JWT authentication
  secureRoute() {
    return { message: 'This is a secured route!' };
  }
}
