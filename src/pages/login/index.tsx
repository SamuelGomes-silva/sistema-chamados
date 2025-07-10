import { useState } from "react";
import logo from "../../assets/logo.png";

export default function Login() {
	const [isLogin, setIslogin] = useState<boolean>(true);
	function handleStatusLogin() {
		setIslogin(!isLogin);
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
						<form className="flex flex-col w-full justify-center items-center">
							{!isLogin && (
								<input
									placeholder="nome"
									type="text"
									className="bg-white w-full max-w-96 mt-3 mb-1.5 h-10 px-3 rounded-sm outline-none border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-500"
								/>
							)}
							<input
								placeholder="email"
								type="email"
								className="bg-white w-full max-w-96 mt-3 mb-1.5 h-10 px-3 rounded-sm outline-none border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-500"
							/>
							<input
								type="password"
								autoComplete="new-password"
								placeholder="senha"
								className="bg-white w-full max-w-96 mt-3 mb-1.5 h-10 px-3 rounded-sm outline-none border border-transparent focus:border-blue-500 focus:ring-2 focus:ring-blue-200 transition-all duration-500"
							/>
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
