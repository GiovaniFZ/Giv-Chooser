import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import { GenerateNumber } from './pages/GenerateNumber';
import { GenerateWord } from './pages/GenerateWord';

export function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<GenerateNumber />} />
        <Route path='word' element={<GenerateWord />} />
      </Routes>
    </BrowserRouter>
  )
}