import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router-dom";
import router from "./App";
import { AuthContextProvider } from "./contexts/auth.context";
import { ToastContainer } from "react-toastify";

createRoot(document.getElementById("root")!).render(
	<AuthContextProvider>
		<RouterProvider router={router} />
		<ToastContainer />
	</AuthContextProvider>
);
