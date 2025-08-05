import axios from "axios";
import type { AxiosError } from "axios";
import { Button } from "@/components/ui/button";

export default function ErrorFallback({
  error,
  resetErrorBoundary,
}: {
  error: Error | AxiosError;
  resetErrorBoundary: () => void;
}) {
  return (
    <div className="flex flex-col items-center justify-center p-6 text-center">
      <h3 className="text-xl font-semibold text-red-600 mb-2">
        {axios.isAxiosError(error)
          ? error.response?.data?.error?.title ?? "Unexpected error"
          : error.message ?? "Unexpected error"}
      </h3>
      <p className="text-gray-600 mb-4">
        {axios.isAxiosError(error)
          ? error.response?.data?.error?.detail ?? error.message
          : error.message}
      </p>
      <Button onClick={resetErrorBoundary} variant="outline">
        Try again
      </Button>
    </div>
  );
}
