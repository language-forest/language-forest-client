"use client";

import { useRouter } from "next/router";

export const useCustomRouter = () => {
  const router = useRouter();

  return router;
};
