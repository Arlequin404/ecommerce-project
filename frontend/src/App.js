import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import UserProfilePage from "./pages/UserProfilePage";
import EditUserProfilePage from "./pages/EditUserProfilePage";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<LoginPage />} />
                <Route path="/profile" element={<UserProfilePage />} />
                <Route path="/profile/edit" element={<EditUserProfilePage />} />
            </Routes>
        </Router>
    );
};

export default App;
