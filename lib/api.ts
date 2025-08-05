import axios from "axios";
import { PRODUCTS } from "@/data/products";

import type { Product, ApiResponse } from "./types";

// Simulate API delay
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface PaginatedResponse<T> {
  data: T[];
  success: boolean;
  message?: string;
  pagination: {
    currentPage: number;
    totalPages: number;
    totalItems: number;
    itemsPerPage: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
  };
}

export const api = {
  // Get all products with optional filtering and pagination
  async getProducts(filters?: {
    category?: string;
    search?: string;
    sortBy?: string;
    page?: number;
    limit?: number;
  }): Promise<PaginatedResponse<Product>> {
    await delay(500); // simulate API delay
    const searchParams = new URLSearchParams();
    const { category, search, sortBy, page, limit } = filters || {};

    if (search) searchParams.append("search", search);
    if (sortBy) searchParams.append("sortBy", sortBy);
    if (page) searchParams.append("page", page.toString());
    if (category) searchParams.append("category", category);
    if (limit) searchParams.append("limit", limit.toString());

    const { data } = await axios(`/api/v1/products?${searchParams.toString()}`);

    return data;
  },

  // Get single product by ID
  async getProduct(id: string): Promise<ApiResponse<Product | null>> {
    const { data } = await axios(`/api/v1/products/${id}`);

    return data;
  },

  getCategories(): ApiResponse<string[]> {
    const categories = [...new Set(PRODUCTS.map((p) => p.category))];

    return {
      data: categories,
      success: true,
    };
  },
};
