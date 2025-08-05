"use client";

import { Search } from "lucide-react";
import { useState, useEffect } from "react";

import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";
import { api } from "@/lib/api";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import type { Filters } from "@/lib/types";

interface SearchAndFiltersProps {
  onFiltersChange?: (filters: Filters) => void;
}

export default function SearchAndFilters({
  onFiltersChange,
}: SearchAndFiltersProps) {
  const [search, setSearch] = useState("");
  const [sort, setSort] = useState("default");
  const [category, setCategory] = useState("all");
  const [categories, setCategories] = useState<string[]>([]);

  useEffect(() => {
    const fetchCategories = async () => {
      const response = api.getCategories();
      if (response.success) {
        setCategories(response.data);
      }
    };
    fetchCategories();
  }, []);

  useEffect(() => {
    const filters = {
      search: search ? search : undefined,
      category: category === "all" ? undefined : category,
      sortBy: sort === "default" ? undefined : sort,
    };
    onFiltersChange?.(filters);
  }, [search, category, sort, onFiltersChange]);

  const clearFilters = () => {
    setSearch("");
    setCategory("all");
    setSort("default");
  };

  const hasActiveFilters = search || category !== "all" || sort !== "default";

  return (
    <div className="mb-8">
      <div className="flex flex-col sm:flex-row gap-4 mb-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            placeholder='Search products... Type in "error" to see an error being caught'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-10"
          />
        </div>

        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger
            className="w-full sm:w-48"
            data-testid="category-select"
          >
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Categories</SelectItem>
            {categories.map((cat) => (
              <SelectItem key={cat} value={cat}>
                {cat}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select value={sort} onValueChange={setSort}>
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="default">Default</SelectItem>
            <SelectItem value="price-low">Price: Low to High</SelectItem>
            <SelectItem value="price-high">Price: High to Low</SelectItem>
            <SelectItem value="name">Name: A to Z</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {hasActiveFilters && (
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-sm text-gray-600">Active filters:</span>
          {search && (
            <Badge
              variant="secondary"
              className="bg-blue-100 text-blue-800 border-0"
            >
              Search: {search}
            </Badge>
          )}
          {category !== "all" && (
            <Badge
              variant="secondary"
              className="bg-purple-100 text-purple-800 border-0"
            >
              Category: {category}
            </Badge>
          )}
          {sort !== "default" && (
            <Badge
              variant="secondary"
              className="bg-green-100 text-green-800 border-0"
            >
              Sort:{" "}
              {sort === "price-low"
                ? "Price ↑"
                : sort === "price-high"
                ? "Price ↓"
                : sort === "name"
                ? "Name A-Z"
                : sort}
            </Badge>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="h-6 px-2 text-xs text-red-600 hover:text-red-700 hover:bg-red-50"
          >
            Clear All
          </Button>
        </div>
      )}
    </div>
  );
}
