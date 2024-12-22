// src/orders/orders.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Order } from './order.schema';

@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(Order.name) private orderModel: Model<Order>, // Injecting the Order model
  ) {}

  async createOrder(userId: string, productIds: string[], quantities: number[], totalPrice: number) {
    const order = new this.orderModel({
      userId,
      productIds,
      quantities,
      totalPrice,
    });
    return order.save();
  }

  async findByUserId(userId: string) {
    return this.orderModel.find({ userId }).exec();
  }
}
