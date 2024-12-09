"use client";

import ReactQueryProviders from "@repo/language-forest-api/QueryProvider";
import { SessionProvider } from "next-auth/react";

export default function ClientProviders({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <SessionProvider>
      <ReactQueryProviders>{children}</ReactQueryProviders>
    </SessionProvider>
  );
}
