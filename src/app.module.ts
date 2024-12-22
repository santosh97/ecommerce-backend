// AppModule.ts
import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsModule } from './products/products.module';
import { CartModule } from './cart/cart.module';
import { OrdersModule } from './orders/orders.module';
import { ConfigModule } from '@nestjs/config';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { AuthModule } from './auth/auth.module'; // Ensure AuthModule is imported

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,  // This makes the configuration globally available
    }),

    // MongoDB connection setup using MongooseModule
    MongooseModule.forRoot(process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce', {}),

    // GraphQL setup with ApolloDriver for automatic schema generation
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'schema.gql', // Auto-generate schema file
      sortSchema: true, // Optional: Helps in sorting the schema
      playground: true, // Optional: Enables GraphQL Playground for testing
      context: ({ req }) => {
        // Optional: Setup context for authentication (e.g., user from JWT)
        return { user: req.user };
      },
    }),

    // Import all your modules
    ProductsModule,
    CartModule,
    OrdersModule,
    AuthModule,  // Ensure AuthModule is imported if using JWT authentication
  ],
})
export class AppModule {}

