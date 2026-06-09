import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import {Stocks} from './Pages/Stocks.tsx';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/stock" element={<Stocks />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;