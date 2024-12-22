// src/orders/orders.module.ts
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Order, OrderSchema } from './order.schema';
import { OrdersService } from './orders.service';
import { OrdersResolver } from './orders.resolver';
import { ProductsModule } from '../products/products.module';  // Import ProductsModule
import { CartModule } from '../cart/cart.module';  // Import CartModule if it's needed

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Order.name, schema: OrderSchema }]),
    ProductsModule,  // Import ProductsModule to use ProductsService
    CartModule,  // Import CartModule if it's used in OrdersResolver
  ],
  providers: [OrdersService, OrdersResolver],
})
export class OrdersModule {}
