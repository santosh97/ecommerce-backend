// src/products/product.schema.ts:
import { ObjectType, Field, ID } from '@nestjs/graphql';
import { Schema, Document } from 'mongoose';

@ObjectType()
export class Product {
  @Field(() => ID)
  id: string;

  @Field()
  name: string;

  @Field()
  description: string;

  @Field()
  price: number;

  @Field()
  stock: number;
}

export const ProductSchema = new Schema({
  name: String,
  description: String,
  price: Number,
  stock: Number,
});

export interface Product extends Document {
  id: string;
  name: string;
  description: string;
  price: number;
  stock: number;
}
