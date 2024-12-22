// src/orders/order.schema.ts
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Schema, Document } from 'mongoose';

// GraphQL type definition for Order
@ObjectType()
export class Order {
  @Field(() => ID) // GraphQL ID type
  id: string;

  @Field()
  userId: string;

  @Field(() => [String]) // List of product IDs
  productIds: string[];

  @Field(() => [Number]) // List of quantities for each product
  quantities: number[];

  @Field()
  totalPrice: number;

  @Field()
  date: Date;
}

// Mongoose schema definition for Order
export const OrderSchema = new Schema({
  userId: { type: String, required: true },
  productIds: { type: [String], required: true },
  quantities: { type: [Number], required: true },
  totalPrice: { type: Number, required: true },
  date: { type: Date, default: Date.now },
});

// Interface for the Order document (Mongoose document)
export interface Order extends Document {
  userId: string;
  productIds: string[];
  quantities: number[];
  totalPrice: number;
  date: Date;
}
