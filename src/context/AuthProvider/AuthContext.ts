import { createContext } from "react";
import type { IAuthContextType } from "../../shared/types/context.types";

export const AuthContext = createContext<IAuthContextType | null>(null);