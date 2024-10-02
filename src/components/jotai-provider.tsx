"use client";

import { Provider } from "jotai";
import { Children } from "react";

interface JotaiProviderProps {
  children: React.ReactNode;
}

export const JotaiProvider = ({ children }: JotaiProviderProps) => {
  return <Provider>{children}</Provider>;
};
