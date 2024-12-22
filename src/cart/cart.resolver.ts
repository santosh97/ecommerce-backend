// src/cart/cart.resolver.ts
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Cart } from './cart.schema';
import { CartService } from './cart.service';
import { Int } from '@nestjs/graphql';  
@Resolver(() => Cart)
export class CartResolver {
  constructor(private cartService: CartService) {}

  // Query to fetch the cart for a user
  @Query(() => Cart, { name: 'getCart' }) // Ensure proper naming for GraphQL query
  async getCart(@Args('userId') userId: string) {
    return this.cartService.findByUserId(userId);
  }

  // Mutation to add a product to the cart
  @Mutation(() => Cart, { name: 'addToCart' }) // Correct mutation name
  async addToCart(
    @Args('userId') userId: string,
    @Args('productId') productId: string,
    @Args('quantity', { type: () => Int }) quantity: number,
  ) {
    return this.cartService.addToCart(userId, productId, quantity);
  }

  // Mutation to remove a product from the cart
  @Mutation(() => Cart, { name: 'removeFromCart' }) // Correct mutation name
  async removeFromCart(@Args('userId') userId: string, @Args('productId') productId: string) {
    return this.cartService.removeFromCart(userId, productId);
  }
}

