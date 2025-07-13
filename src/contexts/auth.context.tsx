import { createContext, type ReactNode } from "react";

interface AuthcontextValues {
	teste: () => void;
}

export const AuthContext = createContext<AuthcontextValues | undefined>(
	undefined
);

interface ProviderProps {
	children: ReactNode;
}

export function AuthContextProvider({ children }: ProviderProps) {
	function teste() {
		alert("teste");
	}
	return (
		<AuthContext.Provider value={{ teste }}>{children}</AuthContext.Provider>
	);
}
