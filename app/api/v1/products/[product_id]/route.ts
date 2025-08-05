import type { NextRequest } from "next/server";

import { PRODUCTS } from "@/data/products";

export const revalidate = 0;

export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ product_id: string }> }
) {
  const { product_id } = await params;

  // Increment counter for each API call

  // Only succeed every third request
  if (product_id == "5" && Math.random() < 0.5) {
    return new Response(
      JSON.stringify({
        data: null,
        error: {
          title: "Simulated product fetch error",
          detail:
            "This is a simulated backend API error for product ID 5. It should succeed sometimes. Please try again.",
        },
        success: false,
      }),
      {
        status: 500,
      }
    );
  }

  const product = PRODUCTS.find((p) => p.id === product_id);

  if (!product) {
    return Response.json(
      {
        data: null,
        success: false,
        error: "Product not found",
      },
      { status: 404 }
    );
  }

  return Response.json({
    data: product,
    success: true,
  });
}
