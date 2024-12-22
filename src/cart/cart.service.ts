// src/cart/cart.service.ts
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Cart } from './cart.schema';

@Injectable()
export class CartService {
  constructor(@InjectModel(Cart.name) private cartModel: Model<Cart>) {}

  // Fetch a cart for a user by userId
  async findByUserId(userId: string): Promise<Cart | null> {
    return this.cartModel.findOne({ userId }).exec();
  }

  // Add product to cart or update quantity
  async addToCart(userId: string, productId: string, quantity: number): Promise<Cart> {
    let cart = await this.findByUserId(userId);
    if (!cart) {
      cart = new this.cartModel({ userId, productIds: [productId], quantities: [quantity] });
    } else {
      const index = cart.productIds.indexOf(productId);
      if (index === -1) {
        cart.productIds.push(productId);
        cart.quantities.push(quantity);
      } else {
        cart.quantities[index] += quantity;
      }
    }
    return cart.save();
  }

  // Remove product from cart
  async removeFromCart(userId: string, productId: string): Promise<Cart | null> {
    const cart = await this.findByUserId(userId);
    if (cart) {
      const index = cart.productIds.indexOf(productId);
      if (index !== -1) {
        cart.productIds.splice(index, 1);
        cart.quantities.splice(index, 1);
        return cart.save();
      }
    }
    return null;
  }

  // Clear the cart (remove all items)
  async clearCart(userId: string): Promise<void> {
    const cart = await this.cartModel.findOne({ userId });
    if (cart) {
      cart.productIds = [];
      cart.quantities = [];
      await cart.save();
    }
  }
}
