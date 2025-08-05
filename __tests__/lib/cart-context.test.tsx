import "@testing-library/jest-dom";
import { renderHook, act } from "@testing-library/react";

import { CartProvider, useCart } from "../../lib/cart-context";

import type { ReactNode } from "react";
import type { Product } from "../../lib/types";

const localStorageMock = (() => {
  let store: Record<string, string> = {};
  return {
    getItem: jest.fn((key: string) => store[key] || null),
    setItem: jest.fn((key: string, value: string) => {
      store[key] = value;
    }),
    clear: jest.fn(() => {
      store = {};
    }),
    removeItem: jest.fn((key: string) => {
      delete store[key];
    }),
  };
})();

Object.defineProperty(window, "localStorage", { value: localStorageMock });

const mockProduct1: Product = {
  id: "1",
  name: "Test Product 1",
  price: 10.99,
  image: "/test1.jpg",
  description: "Test description 1",
  category: "Test Category",
  inStock: true,
};

const mockProduct2: Product = {
  id: "2",
  name: "Test Product 2",
  price: 20.99,
  image: "/test2.jpg",
  description: "Test description 2",
  category: "Test Category",
  inStock: true,
};

const wrapper = ({ children }: { children: ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

describe("Cart Context", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    localStorageMock.clear();
  });

  describe("useCart hook", () => {
    it("should throw an error when used outside of CartProvider", () => {
      const originalError = console.error;
      console.error = jest.fn();

      expect(() => renderHook(() => useCart())).toThrow(
        "useCart must be used within a CartProvider"
      );

      console.error = originalError;
    });

    it("should initialize with empty cart", () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      expect(result.current.items).toEqual([]);
      expect(result.current.total).toBe(0);
      expect(result.current.itemCount).toBe(0);
    });
  });

  describe("Cart operations", () => {
    it("should add a new item to the cart", () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem(mockProduct1);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].product).toEqual(mockProduct1);
      expect(result.current.items[0].quantity).toBe(1);
      expect(result.current.total).toBe(10.99);
      expect(result.current.itemCount).toBe(1);
    });

    it("should increase quantity when adding an existing item", () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem(mockProduct1);
        result.current.addItem(mockProduct1);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].quantity).toBe(2);
      expect(result.current.total).toBeCloseTo(21.98, 1); // 10.99 * 2
      expect(result.current.itemCount).toBe(2);
    });

    it("should add multiple different items to the cart", () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem(mockProduct1);
        result.current.addItem(mockProduct2);
      });

      expect(result.current.items).toHaveLength(2);
      expect(result.current.items[0].product).toEqual(mockProduct1);
      expect(result.current.items[1].product).toEqual(mockProduct2);
      expect(result.current.total).toBeCloseTo(31.98, 1); // 10.99 + 20.99
      expect(result.current.itemCount).toBe(2);
    });

    it("should remove an item from the cart", () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem(mockProduct1);
        result.current.addItem(mockProduct2);
        result.current.removeItem(mockProduct1.id);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].product).toEqual(mockProduct2);
      expect(result.current.total).toBe(20.99);
      expect(result.current.itemCount).toBe(1);
    });

    it("should update item quantity", () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem(mockProduct1);
        result.current.updateQuantity(mockProduct1.id, 5);
      });

      expect(result.current.items).toHaveLength(1);
      expect(result.current.items[0].quantity).toBe(5);
      expect(result.current.total).toBe(54.95); // 10.99 * 5
      expect(result.current.itemCount).toBe(5);
    });

    it("should remove item when updating quantity to zero", () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem(mockProduct1);
        result.current.updateQuantity(mockProduct1.id, 0);
      });

      expect(result.current.items).toHaveLength(0);
      expect(result.current.total).toBe(0);
      expect(result.current.itemCount).toBe(0);
    });

    it("should remove item when updating quantity to negative value", () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem(mockProduct1);
        result.current.updateQuantity(mockProduct1.id, -1);
      });

      expect(result.current.items).toHaveLength(0);
      expect(result.current.total).toBe(0);
      expect(result.current.itemCount).toBe(0);
    });

    it("should clear the cart", () => {
      const { result } = renderHook(() => useCart(), { wrapper });

      act(() => {
        result.current.addItem(mockProduct1);
        result.current.addItem(mockProduct2);
        result.current.clearCart();
      });

      expect(result.current.items).toHaveLength(0);
      expect(result.current.total).toBe(0);
      expect(result.current.itemCount).toBe(0);
    });
  });
});
