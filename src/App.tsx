import { BrowserRouter, Route, Routes } from 'react-router';
import './App.css';
import HomePage from './pages/HomePage';

function App() {
  return (
    <div className='bg-background min-h-[100vh]'>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<HomePage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
