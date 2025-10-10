import type { Context, Config } from "@netlify/functions";
import { fetchWithCache, DAY } from "@netlify/cache";

interface Product {
    id: number;
    title: string;
    price: number;
    description: string;
    category: string;
    image: string;
    rating: {
        rate: number;
        count: number;
    };
}

export default async (req: Request, context: Context) => {
    try {
        // Use fetchWithCache to cache the API response for better performance
        const response = await fetchWithCache("https://fakestoreapi.com/products", {
            ttl: DAY, // Cache for 1 day
            tags: ["products", "fakestore"],
            vary: {
                query: ["limit", "sort"]
            }
        });

        if (!response.ok) {
            throw new Error(`Failed to fetch products: ${response.status} ${response.statusText}`);
        }

        const products: Product[] = await response.json();

        // Log for debugging
        console.log(`Fetched ${products.length} products from FakeStore API`);

        return new Response(JSON.stringify({
            success: true,
            data: products,
            count: products.length
        }), {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Cache-Control": "public, max-age=3600" // Browser cache for 1 hour
            }
        });

    } catch (error) {
        console.error("Error fetching products:", error);

        return new Response(JSON.stringify({
            success: false,
            error: "Failed to fetch products",
            message: error instanceof Error ? error.message : "Unknown error"
        }), {
            status: 500,
            headers: {
                "Content-Type": "application/json"
            }
        });
    }
};

export const config: Config = {
    path: "/api/products"
};