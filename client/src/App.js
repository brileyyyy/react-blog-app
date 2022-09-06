import React, {useEffect} from 'react';
import {Route, Routes, Navigate} from 'react-router-dom'
import HomePage from "./pages/home-page/HomePage";
import PostPage from "./pages/post-page/PostPage";
import LoginPage from "./pages/auth-pages/LoginPage";
import RegistrationPage from "./pages/auth-pages/RegistrationPage";
import CreatePostPage from "./pages/create-post-page/CreatePostPage";
import EditPostPage from "./pages/edit-post-page/EditPostPage";
import CategoriesPage from "./pages/categories-page/CategoriesPage";
import LikedPostPage from "./pages/liked-post-page/LikedPostPage";
import UsersPage from "./pages/users-page/UsersPage";
import {useDispatch, useSelector} from "react-redux";
import {getAuth} from "./store/actions/userActions";
import ProfilePopup from "./components/UI/popup/ProfilePopup";
import LanguagePopup from "./components/UI/popup/LanguagePopup";
import ProfilePage from "./pages/profile-page/ProfilePage";

const App = () => {
    const dispatch = useDispatch()
    const {isAuth} = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getAuth())
    }, [dispatch])

    return (
        <>
            <div className='relative'>
                <Routes>
                    {isAuth
                        ?
                        <Route>
                            <Route path='/' element={<HomePage />} />
                            <Route path='/posts/:id' element={<PostPage />} />
                            <Route path='/create' element={<CreatePostPage />} />
                            <Route path='/posts/:id/edit' element={<EditPostPage />} />
                            <Route path='/categories' element={<CategoriesPage />} />
                            <Route path='/liked' element={<LikedPostPage />} />
                            <Route path='/users' element={<UsersPage />} />
                            <Route path='/users/:id' element={<ProfilePage />} />
                            <Route path='*' element={<Navigate to='/' replace={true}/>} />
                        </Route>
                        :
                        <Route>
                            <Route path='/register' element={<RegistrationPage />} />
                            <Route path='/login' element={<LoginPage />} />
                            <Route path='*' element={<Navigate to='/login' replace={true}/>} />
                        </Route>
                    }
                </Routes>
                <ProfilePopup/>
                <LanguagePopup/>
            </div>
        </>
    )
}

export default App;
