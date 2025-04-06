import React from "react";
import { createBrowserRouter } from "react-router-dom";
import { GenerateNumber } from "./pages/GenerateNumber";
import { GenerateWord } from "./pages/GenerateWord";
import { Result } from "./pages/Result";

const router = createBrowserRouter([
    { path: '/', element: React.createElement(GenerateNumber) },
    { path: '/word', element: React.createElement(GenerateWord) },
    { path: '/result', element: React.createElement(Result) }
])

export default router;