import { createRoot } from "react-dom/client";
import App from "./App";
import RegisterPage from "./pages/auth/register";

const root = createRoot(document.getElementById("app") as HTMLElement);

root.render(<App />);
