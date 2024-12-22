// src/cart/cart.schema.ts
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Schema, Document } from 'mongoose';

// Define the Cart object for GraphQL schema
@ObjectType()
export class Cart {
  @Field(() => ID)
  id: string;

  @Field()
  userId: string;

  @Field(() => [String]) // Array of product IDs
  productIds: string[];

  @Field(() => [Number]) // Array of quantities
  quantities: number[];
}

// Mongoose Schema for the Cart
export const CartSchema = new Schema({
  userId: { type: String, required: true },
  productIds: { type: [String], required: true },
  quantities: { type: [Number], required: true },
});

export interface Cart extends Document {
  id: string;
  userId: string;
  productIds: string[];
  quantities: number[];
}

