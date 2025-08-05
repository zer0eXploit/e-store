// app/providers.jsx
"use client";

import React from "react";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

export default function Providers({ children }) {
  const [queryClient] = React.useState(() => new QueryClient({ cacheTime: 0 }));

  return (
    <QueryClientProvider client={queryClient}>{children}</QueryClientProvider>
  );
}
