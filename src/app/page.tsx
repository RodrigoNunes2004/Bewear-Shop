import { desc } from "drizzle-orm";
import Image from "next/image";

import CategorySelector from "@/components/common/category-selector";
import Footer from "@/components/common/footer";
import { Header } from "@/components/common/header";
import ProductList from "@/components/common/product-list";
import { db } from "@/db";
import { productTable } from "@/db/schema";

const Home = async () => {
  const products = await db.query.productTable.findMany({
    with: {
      variants: true,
    },
  });
  const newlyCreatedProducts = await db.query.productTable.findMany({
    orderBy: [desc(productTable.createdAt)],
    with: {
      variants: true,
    },
  });
  const categories = await db.query.categoryTable.findMany({});

  return (
    <>
      <Header />
      <div className="space-y-6">
        <div className="px-5">
          <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
            <span className="text-xl font-medium text-gray-700">Live a life with style</span>
          </div>
        </div>

        <ProductList products={products} title="Best Sellers" />

        <div className="px-5">
          <CategorySelector categories={categories} />
        </div>

        <div className="px-5">
          <div className="w-full h-48 bg-gray-100 flex items-center justify-center">
            <span className="text-xl font-medium text-gray-700">Live a life with style</span>
          </div>
        </div>

        <ProductList products={newlyCreatedProducts} title="New Products" />
        <Footer />
      </div>
    </>
  );
};

export default Home;