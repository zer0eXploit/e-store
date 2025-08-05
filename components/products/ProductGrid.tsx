"use client";

import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";

import { api } from "@/lib/api";
import ProductCard from "./ProductCard";
import ProductModal from "./ProductModal";
import Pagination from "../common/Pagination";
import ProductGridSkeleton from "@/components/products/ProductGridSkeleton";

import type { Product, Filters } from "@/lib/types";

interface ProductGridProps {
  filters?: Filters;
}

export default function ProductGrid({ filters }: ProductGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  const { data: { data: products, pagination } = {}, isPending } = useQuery({
    queryKey: ["products", filters, currentPage],
    retry: 1,
    throwOnError: true,
    queryFn: async () =>
      api.getProducts({
        ...filters,
        limit: 8,
        page: currentPage,
      }),
  });

  useEffect(() => {
    setCurrentPage(1); // Reset to first page when filters change
  }, [filters]);

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    // Scroll to top when page changes
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  if (isPending) return <ProductGridSkeleton />;

  if (products?.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">
          No products found matching your criteria.
        </p>
      </div>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {(products ?? []).map((product) => (
          <ProductCard
            key={product.id}
            product={product}
            onViewDetails={() => setSelectedProduct(product)}
          />
        ))}
      </div>

      {pagination && (
        <Pagination
          currentPage={pagination.currentPage}
          totalPages={pagination.totalPages}
          totalItems={pagination.totalItems}
          itemsPerPage={pagination.itemsPerPage}
          onPageChange={handlePageChange}
        />
      )}

      {selectedProduct && (
        <ProductModal
          isOpen={!!selectedProduct}
          productId={selectedProduct.id}
          onClose={() => setSelectedProduct(null)}
        />
      )}
    </>
  );
}
