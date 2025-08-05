"use client";

import { useState } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { useQueryErrorResetBoundary } from "@tanstack/react-query";

import ProductGrid from "@/components/products/ProductGrid";
import ErrorFallback from "@/components/common/ErrorFallback";
import SearchAndFilters from "@/components/products/SearchAndFilters";

import type { Filters } from "@/lib/types";

export default function HomePage() {
  const { reset } = useQueryErrorResetBoundary();
  const [filters, setFilters] = useState<Filters>({});

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Products</h1>
        <p className="text-gray-600">
          Discover our amazing collection of products
        </p>
      </div>
      <SearchAndFilters onFiltersChange={setFilters} />
      <ErrorBoundary
        FallbackComponent={ErrorFallback}
        onReset={() => {
          reset();
          setFilters({});
        }}
      >
        <ProductGrid filters={filters} />
      </ErrorBoundary>
    </div>
  );
}
