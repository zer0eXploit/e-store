"use client";

import {
  Dialog,
  DialogTitle,
  DialogHeader,
  DialogContent,
} from "@/components/ui/dialog";

import { toast } from "sonner";
import Image from "next/image";
import { Loader2 } from "lucide-react";
import { ErrorBoundary } from "react-error-boundary";
import { useQuery, useQueryErrorResetBoundary } from "@tanstack/react-query";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import ErrorFallback from "@/components/common/ErrorFallback";

import { api } from "@/lib/api";
import { useCart } from "@/lib/cart-context";

interface ProductModalProps {
  productId: string;
  isOpen: boolean;
  onClose: () => void;
}

function ProductModalContent({
  productId,
  onClose,
}: {
  productId: string;
  onClose: () => void;
}) {
  const { addItem } = useCart();

  const { data, isPending, refetch } = useQuery({
    queryKey: ["product", productId],
    queryFn: () => api.getProduct(productId),
    retry: 0,
    throwOnError: true,
  });

  const product = data?.data;

  const handleAddToCart = () => {
    if (!product || !product.inStock) return;

    addItem(product);
    toast("Added to cart", {
      description: `${product.name} has been added to your cart.`,
    });
    // onClose();
  };

  if (isPending) {
    return (
      <div className="flex items-center justify-center p-12">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    );
  }

  if (!product) {
    return (
      <div className="flex flex-col items-center justify-center p-6 text-center">
        <h3 className="text-xl font-semibold text-gray-800 mb-2">
          Product not found
        </h3>
        <Button onClick={() => refetch()} variant="outline" className="mt-4">
          Try Again
        </Button>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
      <div className="relative aspect-square overflow-hidden rounded-lg bg-gray-100">
        <Image
          fill
          alt={product.name}
          className="object-cover"
          src={product.image || "/placeholder.svg"}
        />
        {!product.inStock && (
          <Badge variant="secondary" className="absolute top-4 right-4">
            Out of Stock
          </Badge>
        )}
      </div>

      <div className="flex flex-col">
        <div className="flex-1">
          <Badge variant="outline" className="mb-2">
            {product.category}
          </Badge>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            {product.name}
          </h2>
          <p className="text-gray-600 mb-6">{product.description}</p>
          <p className="text-3xl font-bold text-gray-900 mb-6">
            ${product.price.toFixed(2)}
          </p>
        </div>

        <Button
          size="lg"
          className="w-full"
          onClick={handleAddToCart}
          disabled={!product.inStock}
          variant={product.inStock ? "default" : "secondary"}
        >
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </div>
    </div>
  );
}

export default function ProductModal({
  productId,
  isOpen,
  onClose,
}: ProductModalProps) {
  const { reset } = useQueryErrorResetBoundary();

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-2xl overflow-y-scroll max-h-screen">
        <DialogHeader>
          <DialogTitle className="sr-only">Product Details</DialogTitle>
        </DialogHeader>
        <ErrorBoundary FallbackComponent={ErrorFallback} onReset={reset}>
          <ProductModalContent productId={productId} onClose={onClose} />
        </ErrorBoundary>
      </DialogContent>
    </Dialog>
  );
}
