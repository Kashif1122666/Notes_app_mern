import { Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import Notes from './pages/Notes';
import { useContext } from 'react';
import AuthContext from './context/AuthContext'; // ✅ This must be correct

export default function App() {
  const { token } = useContext(AuthContext);

  return (
    <Routes>
      <Route path="/" element={token ? <Navigate to="/notes" /> : <Login />} />
      <Route path="/register" element={token ? <Navigate to="/notes" /> : <Register />} />
      <Route path="/notes" element={token ? <Notes /> : <Navigate to="/" />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
