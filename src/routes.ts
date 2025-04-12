import React from 'react';
import { createBrowserRouter } from 'react-router-dom';
import { GenerateNumber } from './pages/GenerateNumber';
import { GenerateWord } from './pages/GenerateWord';
import { Result } from './pages/Result';
import { About } from './pages/About';

const router = createBrowserRouter([
  { path: '/', element: React.createElement(GenerateNumber) },
  { path: '/word', element: React.createElement(GenerateWord) },
  { path: '/result', element: React.createElement(Result) },
  { path: '/about', element: React.createElement(About) },
]);

export default router;
