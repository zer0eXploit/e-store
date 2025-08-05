import type { NextRequest } from "next/server";

import { PRODUCTS } from "@/data/products";

export const revalidate = 0;

export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const page = Number(url.searchParams.get("page")) || 1;
  const limit = Number(url.searchParams.get("limit")) || 8;
  const searchTerm = url.searchParams.get("search");
  const category = url.searchParams.get("category");
  const sortBy = url.searchParams.get("sortBy");

  let filteredProducts = [...PRODUCTS];

  // Apply filters
  if (category && category !== "all") {
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.category.toLowerCase() ===
        url.searchParams.get("category")?.toLowerCase()
    );
  }

  if (searchTerm) {
    if (searchTerm === "error") {
      return Response.json(
        {
          data: null,
          success: false,
          error: {
            title: "Simulated product search error",
            detail:
              "You entered the keyword 'error' in the search bar, which is used to simulate this error. This error is not recoverable. Please change your search term.",
          },
        },
        {
          status: 500,
        }
      );
    }
    filteredProducts = filteredProducts.filter(
      (p) =>
        p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        p.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }

  // Apply sorting
  if (sortBy) {
    switch (sortBy) {
      case "price-low":
        filteredProducts.sort((a, b) => a.price - b.price);
        break;
      case "price-high":
        filteredProducts.sort((a, b) => b.price - a.price);
        break;
      case "name":
        filteredProducts.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        break;
    }
  }

  // Calculate pagination
  const totalItems = filteredProducts.length;
  const totalPages = Math.ceil(totalItems / limit);
  const startIndex = (page - 1) * limit;
  const endIndex = startIndex + limit;
  const paginatedProducts = filteredProducts.slice(startIndex, endIndex);

  return Response.json({
    data: paginatedProducts,
    success: true,
    pagination: {
      totalPages,
      totalItems,
      currentPage: page,
      itemsPerPage: limit,
      hasPreviousPage: page > 1,
      hasNextPage: page < totalPages,
    },
  });
}
