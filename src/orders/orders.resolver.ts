// src/orders/orders.resolver.ts
import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { Order } from './order.schema';
import { OrdersService } from './orders.service';
import { CartService } from '../cart/cart.service';
import { ProductsService } from '../products/products.service';

@Resolver(() => Order)
export class OrdersResolver {
    constructor(
        private ordersService: OrdersService,
        private cartService: CartService,  // Ensure CartService is injected
        private productsService: ProductsService,
    ) { }

    @Query(() => [Order])
    async getOrders(@Args('userId') userId: string) {
        return this.ordersService.findByUserId(userId);
    }

    @Mutation(() => Order)
    async checkout(@Args('userId') userId: string) {
        const cart = await this.cartService.findByUserId(userId);

        // Assuming 'cart.productIds' is an array of product IDs and 'cart.quantities' is an array of quantities
        const productIds = cart.productIds;  // This is the list of product IDs
        const quantities = cart.quantities;  // This is the list of quantities for each product

        // Check if the lengths of productIds and quantities match
        if (productIds.length !== quantities.length) {
            throw new Error('Product IDs and quantities arrays do not match in length.');
        }

        // Create an array of objects combining product ID and quantity
        const productsWithQuantity = productIds.map((id, index) => ({
            id,
            quantity: quantities[index],
        }));

        // Calculate total price using the product IDs and quantities
        const totalPrice = await this.productsService.calculateTotalPrice(productsWithQuantity);

        // Deduct stock for the products
        await this.productsService.deductStock(productsWithQuantity);

        // Clear the user's cart
        await this.cartService.clearCart(userId);

        // Create the order
        return this.ordersService.createOrder(userId, productIds, quantities, totalPrice);
    }
}
