// src/products/products.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product } from './product.schema';

@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(Product.name) private productModel: Model<Product>,
  ) {}

  async findAll(page: number, limit: number): Promise<Product[]> {
    return this.productModel
      .find()
      .skip((page - 1) * limit)
      .limit(limit)
      .exec();
  }

  async findOne(id: string): Promise<Product | null> {
    return this.productModel.findById(id).exec();
  }

  async create(createProductDto: { name: string; description: string; price: number; stock: number }): Promise<Product> {
    const createdProduct = new this.productModel(createProductDto);
    return createdProduct.save();
  }

  async update(id: string, updateProductDto: { name: string; description: string; price: number; stock: number }): Promise<Product | null> {
    return this.productModel.findByIdAndUpdate(id, updateProductDto, { new: true }).exec();
  }

  async delete(id: string): Promise<boolean> {
    const result = await this.productModel.deleteOne({ _id: id }).exec();
    return result.deletedCount > 0;
  }

  async deductStock(products: any[]): Promise<void> {
    for (const product of products) {
      const { id, quantity } = product;
      const existingProduct = await this.productModel.findById(id);
      if (existingProduct && existingProduct.stock >= quantity) {
        existingProduct.stock -= quantity;
        await existingProduct.save();
      } else {
        throw new Error(`Not enough stock for product ${id}`);
      }
    }
  }

  async calculateTotalPrice(products: { id: string; quantity: number }[]): Promise<number> {
    let totalPrice = 0;
    for (const product of products) {
      const { id, quantity } = product;
      const productDetails = await this.productModel.findById(id);
      if (productDetails) {
        totalPrice += productDetails.price * quantity;
      } else {
        throw new Error(`Product with ID ${id} not found`);
      }
    }
    return totalPrice;
  }
}
