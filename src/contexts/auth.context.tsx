import { createContext, useState, type ReactNode } from "react";
import type { SigninData, SignupData } from "../pages/login/schemas";
import {
	createUserWithEmailAndPassword,
	signInWithEmailAndPassword,
	updateProfile,
} from "firebase/auth";
import { auth } from "../services/firebase/api";
import { toast } from "react-toastify";

interface AuthcontextValues {
	handleSignIn: (data: SigninData) => Promise<boolean>;
	handleSignUp: (data: SignupData) => Promise<boolean>;
	handleLogOut: () => Promise<void>;
	user: UserProps | null;
}

interface UserProps {
	uid: string;
	name: string;
	email: string;
}

export const AuthContext = createContext<AuthcontextValues | undefined>(
	undefined
);

interface ProviderProps {
	children: ReactNode;
}

export function AuthContextProvider({ children }: ProviderProps) {
	const [user, setUser] = useState<UserProps | null>(null);
	async function handleSignIn(data: SigninData) {
		try {
			const { email, password } = data;
			const response = await signInWithEmailAndPassword(auth, email, password);
			setUser({
				email,
				name: response?.user?.displayName ?? "",
				uid: response?.user?.uid,
			});
			return true;
		} catch (error) {
			const message =
				error instanceof Error
					? error.message
					: "Erro inesperado ao realizar o login";
			toast.error(message);
			return false;
		}
	}
	async function handleSignUp(data: SignupData) {
		try {
			const { email, name, password } = data;
			const response = await createUserWithEmailAndPassword(
				auth,
				email,
				password
			);
			await updateProfile(response.user, { displayName: data?.name });
			setUser({
				email,
				name,
				uid: response?.user?.uid,
			});
			return true;
		} catch (error) {
			const message =
				error instanceof Error ? error.message : "Erro inesperado ao cadastrar";
			toast.error(message);
			return false;
		}
	}
	async function handleLogOut() {}
	return (
		<AuthContext.Provider
			value={{ handleSignIn, handleSignUp, user, handleLogOut }}
		>
			{children}
		</AuthContext.Provider>
	);
}
