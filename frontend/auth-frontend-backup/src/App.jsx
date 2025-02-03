import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import RegisterForm from './components/RegisterForm';
import LoginForm from './components/LoginForm';

const App = () => {
    return (
        <Router>
            <nav>
                <Link to="/register">Registro</Link>
                <Link to="/login">Iniciar Sesión</Link>
            </nav>
            <Routes>
                <Route path="/register" element={<RegisterForm />} />
                <Route path="/login" element={<LoginForm />} />
            </Routes>
        </Router>
    );
};

export default App;
