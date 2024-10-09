import './App.css';
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import Main from './pages/Main';
import Details from './pages/Details';
import Login from './pages/Login';
import Register from './pages/Register';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<ProtectedRoute><Home /></ProtectedRoute>} />
        <Route path='/main' element={<ProtectedRoute><Main /></ProtectedRoute>} />
        <Route path='/blog/:id' element={<ProtectedRoute><Details /></ProtectedRoute>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

export function ProtectedRoute({ children }) {
  const user = JSON.parse(localStorage.getItem('userdata'));

  if (user && user.success) {
    return children;
  } else {
    return <Navigate to='/' />;
  }
}
