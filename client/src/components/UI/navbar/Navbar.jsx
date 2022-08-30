import React from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Button from "../button/Button";
import {logout} from "../../../store/reducers/userReducer";
import {FiLogOut} from "react-icons/fi";
import {BsFillSunFill} from "react-icons/bs";
import './navbar.scss'

const switchPaths = (param) => {
    switch (param) {
        case '/':
            return <span className='text-2xl font-bold'>Новые статьи</span>
        case '/categories':
            return <span className='text-2xl font-bold'>Популярные категории</span>
        case '/liked':
            return <span className='text-2xl font-bold'>Избранное</span>
        case '/users':
            return <span className='text-2xl font-bold'>Пользователи</span>
        default:
            return <span className='text-2xl font-bold'>Новые статьи</span>
    }
}

const Navbar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {isAuth} = useSelector(state => state.user)

    return (
        <div className='navbar__wrapper'>
            {switchPaths(window.location.pathname)}
            {isAuth
                ?
                <div className='flex items-center'>
                    <div className='logout__btn' onClick={() => dispatch(logout())}>
                        <FiLogOut size={16} className='mr-2'/>
                        Выйти
                    </div>
                    <BsFillSunFill size={20} className='mx-6 cursor-pointer'/>
                    <img className='avatar' src='images/briley.jpg' alt='user-avatar'/>
                </div>
                :
                <div className='auth__btns'>
                    <Button className='login__btn' onClick={() => navigate('/login')}>
                        Войти
                    </Button>
                    <Button className='register__btn' onClick={() => navigate('/register')}>
                        Зарегестрироваться
                    </Button>
                </div>
            }
        </div>
    );
};

export default Navbar;