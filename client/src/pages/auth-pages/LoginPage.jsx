import React, {useState} from 'react';
import {NavLink} from 'react-router-dom'
import {useDispatch, useSelector} from "react-redux";
import {resetErrors} from "../../store/reducers/userReducer";
import {login} from "../../store/actions/userActions"
import './authPages.scss'

const LoginPage = () => {
    const dispatch = useDispatch()
    const {emailError, passwordError, compareError} = useSelector(state => state.user)
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    return (
        <div className='h-screen flex'>
            <div className='auth__form'>
                <span className='auth__title'>
                    Вход
                </span>
                <input
                    className='auth__input'
                    type='text'
                    value={email}
                    placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && <span className='auth__error mb-2'>{emailError}</span>}
                <input
                    className='auth__input'
                    type='password'
                    value={password}
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError && <span className='auth__error'>{passwordError}</span>}
                {compareError && <span className='auth__error'>{compareError}</span>}
                <button
                    className='auth__btn'
                    onClick={() => dispatch(login({dispatch, email, password}))}
                >
                    Войти
                </button>
                <div className='mt-6 text-center text-sm'>
                    <span className='text-gray-400 mr-3'>Нет аккаунта?</span>
                    <NavLink
                        to='/register'
                        className='underline'
                        onClick={() => dispatch(resetErrors())}
                    >
                        Зарегестрироваться
                    </NavLink>
                </div>
            </div>
            <img src='images/bg_auth.png' alt='blog symbols'/>
        </div>
    );
};

export default LoginPage;