import React from 'react';
import {Route, Routes, Navigate} from 'react-router-dom'
import HomePage from "./pages/home-page/HomePage";
import PostPage from "./pages/post-page/PostPage";
import LoginPage from "./pages/login-page/LoginPage";
import RegistrationPage from "./pages/registration-page/RegistrationPage";
import CreatePostPage from "./pages/create-post-page/CreatePostPage";
import CategoriesPage from "./pages/categories-page/CategoriesPage";

const App = () => {
    return (
        <>
            <div className='mx-auto max-w-7xl'>
                <Routes>
                    <Route path='/' element={<HomePage />} />
                    <Route path='/posts/:id' element={<PostPage />} />
                    <Route path='/posts' element={<CreatePostPage />} />
                    <Route path='/categories' element={<CategoriesPage />} />
                    <Route path='/register' element={<RegistrationPage />} />
                    <Route path='/login' element={<LoginPage />} />
                    <Route path='*' element={<Navigate to='/' replace={true}/>} />
                </Routes>
            </div>
        </>
    )
}

export default App;
