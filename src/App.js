import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";

const App = () => {
    return (
        <Router>
            <Routes>
                <Route path="" element={<HomePage />} />
                <Route path="/users/:id" element={<UserPage />} />
            </Routes>
        </Router>
    );
};

export default App;
