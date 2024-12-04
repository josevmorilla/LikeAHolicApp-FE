import React from "react";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import PostPage from "./pages/PostPage";
import PostList from "./components/posts/PostList";
import UserList from "./components/users/UserList";
import Header from "./components/app/Header";

const App = () => {
    return (

        <Router>
            <Header/>
            <Routes>
                <Route path="/" element={<HomePage/>}/>
                <Route path="/posts" element={<PostList/>}/>
                <Route path="/users" element={<UserList/>}/>
                <Route path="/posts/:id" element={<PostPage/>}/>
                <Route path="/users/:id" element={<UserPage/>}/>
            </Routes>
        </Router>
    );
};

export default App;
