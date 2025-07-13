import { useContext, useMemo, useState } from "react";
import logo from "../../assets/logo.png";
import { AuthContext } from "../../contexts/auth.context";
import Input from "../../components/input";
import { useForm, type FieldErrors } from "react-hook-form";
import {
	signinSchema,
	signupSchema,
	type SigninData,
	type SignupData,
} from "./schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";

type loginSchema = SigninData | SignupData;
type FormData = loginSchema;
type FormType = "login" | "signup";

export default function Login() {
	const { handleSignIn, handleSignUp } = useContext(AuthContext)!; //obs o ! força dizendo que não é undefined
	const [isLogin, setIslogin] = useState<boolean>(true);
	const [formType, setFormType] = useState<FormType>("login");

	const schema = useMemo(() => {
		return formType === "login" ? signinSchema : signupSchema;
	}, [formType]);

	const {
		register,
		handleSubmit,
		formState: { errors },
		reset,
	} = useForm<SigninData | SignupData>({
		resolver: zodResolver(schema),
	});

	function handleStatusLogin() {
		setIslogin((prev) => {
			const newState = !prev;
			setFormType(newState ? "login" : "signup");
			reset();
			return newState;
		});
	}

	function ErrorMessage({ message }: { message?: string }) {
		return (
			<p className="text-red-500 font-semibold w-full transition-all duration-500  max-w-96">
				{message}
			</p>
		);
	}

	async function onSubmit(data: FormData) {
		if (data === null) return;
		if (isLogin) {
			const login = await handleSignIn(data);
			if (login) {
				toast.success("Logado com sucesso!");
				return;
			}
		} else if (!isLogin && formType === "signup") {
			const signup = await handleSignUp(data as SignupData);
			if (signup) {
				toast.success("Conta criada com sucesso!");
				return;
			}
		}
	}

	return (
		<>
			<main className="flex bg-zinc-900 h-dvh w-dvw p-8">
				<section className="bg-neutral-300 mx-auto my-auto flex flex-col w-full max-w-xl rounded-t-3xl rounded-b-3xl">
					<div className=" from-indigo-800  bg-gradient-to-bl to-blue-700   flex items-center justify-center px-2.5  py-4 rounded-t-2xl">
						<img
							className="select-none w-28 h-[80px]"
							src={logo}
							alt="Logo do app"
						/>
					</div>
					<div className="flex  flex-col justify-center items-center px-5 py-10 w-full ">
						<form
							key={formType}
							className="flex flex-col w-full justify-center items-center"
							onSubmit={handleSubmit(onSubmit)}
						>
							{formType === "signup" && (
								<>
									<Input
										{...register("name")}
										placeholder="Nome"
										type="text"
										autoComplete="off"
										errors={
											(errors as FieldErrors<SignupData>).name?.message
												? true
												: false
										}
									/>
									<ErrorMessage
										message={(errors as FieldErrors<SignupData>).name?.message}
									/>
								</>
							)}
							<Input
								placeholder="Email"
								type="email"
								autoComplete="email"
								{...register("email")}
								errors={errors.email?.message ? true : false}
							/>
							<ErrorMessage message={errors.email?.message} />
							<Input
								type="password"
								autoComplete="new-password"
								placeholder="Senha"
								{...register("password")}
								errors={errors.password?.message ? true : false}
							/>
							<ErrorMessage message={errors.password?.message} />
							<button
								type="submit"
								className="bg-blue-950 text-white font-bold text-xl h-10  w-full max-w-96 mt-3 mb-3 rounded-sm py-1 cursor-pointer hover:border-2 border-gray-400 hover:bg-blue-800 transition-all duration-500"
							>
								{isLogin ? "Acessar" : "Cadastrar"}
							</button>
						</form>
						<button
							type="button"
							onClick={handleStatusLogin}
							className=" cursor-pointer text-gray-500 transition-all duration-500 hover:text-black"
						>
							{isLogin ? "Criar uma nova conta" : "Realizar o login"}
						</button>
					</div>
				</section>
			</main>
		</>
	);
}
