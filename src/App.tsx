import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { GenerateNumber } from './pages/GenerateNumber';
import { GenerateWord } from './pages/GenerateWord';
import { HeaderComponent } from './components/Header/header.tsx';
import { Result } from './pages/Result/index.tsx';

export function App() {
  return (
    <BrowserRouter>
      <HeaderComponent />
      <Routes>
        <Route index element={<GenerateNumber />} />
        <Route path='word' element={<GenerateWord />} />
        <Route path='result' element={<Result />} />
      </Routes>
    </BrowserRouter>
  )
}