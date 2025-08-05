"use client"

import Image from "next/image"
import type { CartItem as CartItemType } from "@/lib/types"
import { useCart } from "@/lib/cart-context"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Minus, Plus, Trash2 } from "lucide-react"

interface CartItemProps {
  item: CartItemType
}

export default function CartItem({ item }: CartItemProps) {
  const { updateQuantity, removeItem } = useCart()

  const handleQuantityChange = (newQuantity: number) => {
    if (newQuantity < 1) {
      removeItem(item.product.id)
    } else {
      updateQuantity(item.product.id, newQuantity)
    }
  }

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          <div className="relative w-20 h-20 flex-shrink-0">
            <Image
              src={item.product.image || "/placeholder.svg"}
              alt={item.product.name}
              fill
              className="object-cover rounded-lg"
            />
          </div>

          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-gray-900 truncate">{item.product.name}</h3>
            <p className="text-sm text-gray-600 mt-1">${item.product.price.toFixed(2)} each</p>
          </div>

          <div className="flex items-center space-x-2">
            <Button variant="outline" size="sm" onClick={() => handleQuantityChange(item.quantity - 1)}>
              <Minus className="h-3 w-3" />
            </Button>
            <span className="w-8 text-center font-medium">{item.quantity}</span>
            <Button variant="outline" size="sm" onClick={() => handleQuantityChange(item.quantity + 1)}>
              <Plus className="h-3 w-3" />
            </Button>
          </div>

          <div className="text-right">
            <p className="font-semibold text-gray-900">${(item.product.price * item.quantity).toFixed(2)}</p>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => removeItem(item.product.id)}
              className="text-red-600 hover:text-red-700 mt-1"
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
