import { neon } from '@neondatabase/serverless';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL is not set');
}

// Create a connection to the Neon database
export const sql = neon(process.env.DATABASE_URL);

// Helper function to test the database connection
export async function testConnection() {
  try {
    const result = await sql`SELECT version()`;
    console.log('Database connected successfully:', result[0]);
    return { success: true, data: result[0] };
  } catch (error) {
    console.error('Database connection failed:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Helper function to create tables (example)
export async function createTables() {
  try {
    // Example table creation - customize based on your needs
    await sql`
      CREATE TABLE IF NOT EXISTS users (
        id SERIAL PRIMARY KEY,
        email VARCHAR(255) UNIQUE NOT NULL,
        name VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    await sql`
      CREATE TABLE IF NOT EXISTS products (
        id SERIAL PRIMARY KEY,
        name VARCHAR(255) NOT NULL,
        description TEXT,
        price DECIMAL(10, 2) NOT NULL,
        image_url VARCHAR(255),
        category VARCHAR(100),
        stock_quantity INTEGER DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `;

    console.log('Tables created successfully');
    return { success: true };
  } catch (error) {
    console.error('Error creating tables:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Helper function to get all users (example query)
export async function getUsers() {
  try {
    const users = await sql`SELECT * FROM users ORDER BY created_at DESC`;
    return { success: true, data: users };
  } catch (error) {
    console.error('Error fetching users:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Helper function to get all products (example query)
export async function getProducts() {
  try {
    const products = await sql`SELECT * FROM products ORDER BY created_at DESC`;
    return { success: true, data: products };
  } catch (error) {
    console.error('Error fetching products:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Helper function to create a new user (example)
export async function createUser(email: string, name: string) {
  try {
    const result = await sql`
      INSERT INTO users (email, name)
      VALUES (${email}, ${name})
      RETURNING *
    `;
    return { success: true, data: result[0] };
  } catch (error) {
    console.error('Error creating user:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}

// Helper function to create a new product (example)
export async function createProduct(
  name: string,
  description: string,
  price: number,
  imageUrl?: string,
  category?: string,
  stockQuantity?: number
) {
  try {
    const result = await sql`
      INSERT INTO products (name, description, price, image_url, category, stock_quantity)
      VALUES (${name}, ${description}, ${price}, ${imageUrl || null}, ${category || null}, ${stockQuantity || 0})
      RETURNING *
    `;
    return { success: true, data: result[0] };
  } catch (error) {
    console.error('Error creating product:', error);
    return { success: false, error: error instanceof Error ? error.message : 'Unknown error' };
  }
}