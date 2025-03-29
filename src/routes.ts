import { createBrowserRouter } from "react-router-dom";
import { GenerateNumber } from "./pages/GenerateNumber";
import { GenerateWord } from "./pages/GenerateWord";

const router = createBrowserRouter([
    { path: '/', element: GenerateNumber() },
    { path: '/word', element: GenerateWord() }
])

export default router;