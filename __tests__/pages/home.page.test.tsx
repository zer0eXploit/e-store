import "@testing-library/jest-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";

import HomePage from "../../app/page";

import { api } from "../../lib/api";
import { CartProvider } from "../../lib/cart-context";

// Mock the API
jest.mock("../../lib/api", () => ({
  api: {
    getProducts: jest.fn(),
    getCategories: jest.fn().mockReturnValue({
      success: true,
      data: ["Electronics", "Clothing", "Fitness", "Kitchen"],
    }),
  },
}));

// Mock the ErrorBoundary component
jest.mock("react-error-boundary", () => ({
  ErrorBoundary: ({ children }: { children: React.ReactNode }) => children,
  useQueryErrorResetBoundary: () => ({ reset: jest.fn() }),
}));

// Create a wrapper component with necessary providers
const createWrapper = () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        retry: false,
      },
    },
  });

  return ({ children }: { children: React.ReactNode }) => (
    <QueryClientProvider client={queryClient}>
      <CartProvider>{children}</CartProvider>
    </QueryClientProvider>
  );
};

describe("HomePage", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    // Mock successful product response
    (api.getProducts as jest.Mock).mockResolvedValue({
      data: [
        {
          id: "1",
          name: "Test Product",
          price: 99.99,
          image: "/placeholder.svg",
          description: "Test description",
          category: "Electronics",
          inStock: true,
        },
      ],
      success: true,
      pagination: {
        currentPage: 1,
        totalPages: 1,
        totalItems: 1,
        itemsPerPage: 8,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    });
  });

  it("renders a heading", () => {
    render(<HomePage />, { wrapper: createWrapper() });

    const heading = screen.getByRole("heading", { level: 1 });

    expect(heading).toBeInTheDocument();
    expect(heading).toHaveTextContent("Our Products");
  });

  it("renders the SearchAndFilters component", async () => {
    render(<HomePage />, { wrapper: createWrapper() });

    // Check for search input
    expect(screen.getByPlaceholderText(/search products/i)).toBeInTheDocument();

    // Check for category dropdown
    expect(screen.getByText(/all categories/i)).toBeInTheDocument();
  });

  it("renders the ProductGrid component and shows products", async () => {
    render(<HomePage />, { wrapper: createWrapper() });

    // Wait for products to load
    await waitFor(() => {
      expect(screen.getByText("Test Product")).toBeInTheDocument();
    });

    // Check if price is displayed
    expect(screen.getByText("$99.99")).toBeInTheDocument();

    // Check if Add to Cart button is displayed
    expect(screen.getByText("Add to Cart")).toBeInTheDocument();
  });

  it("updates filters when search input changes", async () => {
    render(<HomePage />, { wrapper: createWrapper() });

    const searchInput = screen.getByPlaceholderText(/search products/i);
    fireEvent.change(searchInput, { target: { value: "test search" } });

    await waitFor(() => {
      expect(api.getProducts).toHaveBeenCalledWith(
        expect.objectContaining({
          search: "test search",
        })
      );
    });
  });

  it("updates filters when category is selected", async () => {
    render(<HomePage />, { wrapper: createWrapper() });

    const categoryDropdown = screen.getByTestId("category-select");
    fireEvent.click(categoryDropdown);

    await waitFor(() => {
      const option = screen.getByText("Electronics");
      fireEvent.click(option);
    });

    await waitFor(() => {
      expect(api.getProducts).toHaveBeenCalledWith(
        expect.objectContaining({
          category: "Electronics",
        })
      );
    });
  });

  it("shows no products message when API returns empty array", async () => {
    (api.getProducts as jest.Mock).mockResolvedValue({
      data: [],
      success: true,
      pagination: {
        currentPage: 1,
        totalPages: 0,
        totalItems: 0,
        itemsPerPage: 8,
        hasNextPage: false,
        hasPreviousPage: false,
      },
    });

    render(<HomePage />, { wrapper: createWrapper() });

    await waitFor(() => {
      expect(
        screen.getByText(/no products found matching your criteria/i)
      ).toBeInTheDocument();
    });
  });
});
