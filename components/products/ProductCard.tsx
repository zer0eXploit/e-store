"use client";

import Image from "next/image";

import { toast } from "sonner";
import { useCart } from "@/lib/cart-context";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

import type React from "react";
import type { Product } from "@/lib/types";

interface ProductCardProps {
  product: Product;
  onViewDetails: () => void;
}

export default function ProductCard({
  product,
  onViewDetails,
}: ProductCardProps) {
  const { addItem } = useCart();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!product.inStock) return;

    addItem(product);
    toast("Added to cart", {
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <Card className="group cursor-pointer hover:shadow-lg transition-shadow duration-200">
      <CardContent className="p-4">
        <div className="relative aspect-square mb-4 overflow-hidden rounded-lg bg-gray-100">
          <Image
            src={product.image || "/placeholder.svg"}
            alt={product.name}
            fill
            className="object-cover group-hover:scale-105 transition-transform duration-200"
            onClick={onViewDetails}
          />
          {!product.inStock && (
            <Badge variant="secondary" className="absolute top-2 right-2">
              Out of Stock
            </Badge>
          )}
        </div>

        <div onClick={onViewDetails}>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">
            {product.name}
          </h3>
          {/* <p className="text-sm text-gray-600 mb-2 line-clamp-2">
            {product.description}
          </p> */}
          <p className="text-lg font-bold text-gray-900">
            ${product.price.toFixed(2)}
          </p>
        </div>
      </CardContent>

      <CardFooter className="p-4 pt-0">
        <Button
          onClick={handleAddToCart}
          disabled={!product.inStock}
          className="w-full"
          variant={product.inStock ? "default" : "secondary"}
        >
          {product.inStock ? "Add to Cart" : "Out of Stock"}
        </Button>
      </CardFooter>
    </Card>
  );
}
