// src/products/seed/seed.module.ts
import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { Product, ProductSchema } from '../product.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
  ],
  providers: [SeedService],  // Ensure SeedService is here
  controllers: [SeedController],  // Ensure SeedController is here
})
export class SeedModule {}
