// src/products/seed/seed.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from '../product.schema';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async seedProducts() {
    const products = [
      {
        name: 'Product 1',
        description: 'This is product 1 description.',
        price: 100,
        stock: 50,
      },
      {
        name: 'Product 2',
        description: 'This is product 2 description.',
        price: 200,
        stock: 30,
      },
      {
        name: 'Product 3',
        description: 'This is product 3 description.',
        price: 300,
        stock: 20,
      },
    ];

    await this.productModel.insertMany(products);
    console.log('Sample products seeded!');
  }
}
