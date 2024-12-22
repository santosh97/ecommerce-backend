// src/products/products.resolver.ts
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Product } from './product.schema';
import { ProductsService } from './products.service';
import { Int } from '@nestjs/graphql';
@Resolver(() => Product)
export class ProductsResolver {
  constructor(private productsService: ProductsService) {}

  @Query(() => [Product])
  async getProducts(
    @Args('page', { type: () => Int }) page: number, // Use Int instead of Number
    @Args('limit', { type: () => Int }) limit: number, // Use Int instead of Number
  ): Promise<Product[]> {
    return this.productsService.findAll(page, limit);
  }

  @Query(() => Product)
  async getProduct(@Args('id', { type: () => String }) id: string): Promise<Product | null> {
    return this.productsService.findOne(id);
  }

  // @Mutation(() => Product)
  // async createProduct(
  //   @Args('name') name: string,
  //   @Args('description') description: string,
  //   @Args('price') price: number,
  //   @Args('stock') stock: number,
  // ) {
  //   return this.productsService.create({ name, description, price, stock });
  // }

  // @Mutation(() => Product)
  // async updateProduct(
  //   @Args('id') id: string,
  //   @Args('name') name: string,
  //   @Args('description') description: string,
  //   @Args('price') price: number,
  //   @Args('stock') stock: number,
  // ) {
  //   return this.productsService.update(id, { name, description, price, stock });
  // }

  // @Mutation(() => Boolean)
  // async deleteProduct(@Args('id') id: string) {
  //   return this.productsService.delete(id);
  // }
}
