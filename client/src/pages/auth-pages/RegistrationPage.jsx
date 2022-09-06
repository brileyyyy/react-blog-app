import React, {useState} from 'react';
import {NavLink, useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {resetErrors} from "../../store/reducers/userReducer";
import {registration} from "../../store/actions/userActions";
import './authPages.scss'

const RegistrationPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {nameError, emailError, passwordError, compareError} = useSelector(state => state.user)
    const [name, setName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    function registerHandler() {
        dispatch(registration({dispatch, navigate, name, email, password}))
    }

    return (
        <div className='h-screen flex bg-white'>
            <img className='max-w-sm object-cover' src='images/bg_auth.png' alt='blog symbols'/>
            <div className='auth__form'>
                <span className='auth__title'>
                    Регистрация
                </span>
                <input
                    className='auth__input'
                    type='text'
                    value={name}
                    placeholder='Username'
                    onChange={(e) => setName(e.target.value)}
                />
                {nameError && <span className='auth__error mb-2'>{nameError}</span>}
                <input
                    className='auth__input'
                    type='text'
                    value={email}
                    placeholder='Email'
                    onChange={(e) => setEmail(e.target.value)}
                />
                {emailError && <span className='auth__error mb-2'>{emailError}</span>}
                {compareError && <span className='auth__error mb-2'>{compareError}</span>}
                <input
                    className='auth__input'
                    type='password'
                    value={password}
                    placeholder='Password'
                    onChange={(e) => setPassword(e.target.value)}
                />
                {passwordError && <span className='auth__error'>{passwordError}</span>}
                <button
                    className='auth__btn'
                    onClick={() => registerHandler()}
                >
                    Зарегестрироваться
                </button>
                <div className='mt-6 text-center text-sm'>
                    <span className='text-gray-400 mr-3'>Есть аккаунт?</span>
                    <NavLink
                        to='/login'
                        className='underline'
                        onClick={() => dispatch(resetErrors())}
                    >
                        Войти
                    </NavLink>
                </div>
            </div>
        </div>
    );
};

export default RegistrationPage;