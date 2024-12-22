// src/auth/seed-user.ts
import { connect, Connection } from 'mongoose';
import { UserSchema } from './user.schema';

async function seedUser() {
  const mongoUri = process.env.MONGO_URI || 'mongodb://localhost:27017/ecommerce';
  
  // Connect to MongoDB and get the connection instance
  const mongooseInstance = await connect(mongoUri);
  const connection: Connection = mongooseInstance.connection;

  // Register the User model
  const UserModel = connection.model('User', UserSchema);

  // Check if a user already exists
  const existingUser = await UserModel.findOne({ email: 'test@example.com' });
  if (existingUser) {
    console.log('User already exists:', existingUser);
    return;
  }

  // Create a new user
  const user = new UserModel({
    username: 'username',
    password: 'password123', // Store hashed password in a real application
  });

  await user.save();
  console.log('Seeded user:', user);

  // Close the connection
  await connection.close();
}

seedUser().catch((err) => {
  console.error('Error seeding user:', err);
});
