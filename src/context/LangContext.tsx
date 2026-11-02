import { createContext, useContext } from "react";
import type { Lang } from "../types.ts";

export const LangContext = createContext<Lang>("es");

export function useLang(): Lang {
  return useContext(LangContext);
}
