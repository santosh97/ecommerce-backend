// src/cart/cart.module.ts
import { Module } from '@nestjs/common';
import { CartService } from './cart.service';
import { MongooseModule } from '@nestjs/mongoose';
import { Cart, CartSchema } from './cart.schema';
import { CartResolver } from './cart.resolver'; // Import the CartResolver

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Cart.name, schema: CartSchema }]),
  ],
  providers: [CartService, CartResolver], // Add CartResolver to the providers
  exports: [CartService],  // Export CartService to be used in other modules like OrdersModule
})
export class CartModule {}
