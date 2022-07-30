import React, {useEffect} from 'react';
import {Route, Routes, Navigate} from 'react-router-dom'
import HomePage from "./pages/home-page/HomePage";
import PostPage from "./pages/post-page/PostPage";
import LoginPage from "./pages/auth-pages/LoginPage";
import RegistrationPage from "./pages/auth-pages/RegistrationPage";
import CreatePostPage from "./pages/create-post-page/CreatePostPage";
import CategoriesPage from "./pages/categories-page/CategoriesPage";
import {useDispatch, useSelector} from "react-redux";
import {getAuth} from "./store/reducers/userReducer";

const App = () => {
    const dispatch = useDispatch()
    const {isAuth} = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getAuth())
    }, [dispatch])

    return (
        <>
            <div>
                <Routes>
                    {isAuth
                        ?
                        <Route>
                            <Route path='/' element={<HomePage />} />
                            <Route path='/posts/:id' element={<PostPage />} />
                            <Route path='/create' element={<CreatePostPage />} />
                            <Route path='/categories' element={<CategoriesPage />} />
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
            </div>
        </>
    )
}

export default App;
