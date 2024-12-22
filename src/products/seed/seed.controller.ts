// src/products/seed/seed.controller.ts
import { Controller, Get } from '@nestjs/common';
import { SeedService } from './seed.service';

@Controller('seed') // The base route for this controller
export class SeedController {
  constructor(private readonly seedService: SeedService) {}

  @Get('products') // The full route is '/seed/products'
  async seedProducts() {
    await this.seedService.seedProducts();
    return 'Sample products have been seeded!';
  }
}
