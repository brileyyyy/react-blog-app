import React from 'react';
import {BsFillSunFill} from "react-icons/bs";
import LoginButton from "../button/LoginButton";
import RegistrationButton from "../button/RegistrationButton";

const Navbar = () => {
    const isAuth = true

    return (
        <div className='py-4 px-6 flex justify-between items-center border-b'>
            {window.location.pathname === '/'
                ? <span className='text-2xl font-bold'>Новые статьи</span>
                : <span className='text-2xl font-bold'>Популярные категории</span>
            }
            {isAuth
                ?
                <div className='flex items-center'>
                    <BsFillSunFill size={20} className='mr-6 cursor-pointer'/>
                    <img
                        className='w-8 h-8 object-cover rounded-full cursor-pointer'
                        src='images/briley.jpg'
                        alt='user-avatar'
                    />
                </div>
                :
                <div className='flex items-center text-sm font-medium'>
                    <LoginButton/>
                    <RegistrationButton/>
                </div>
            }
        </div>
    );
};

export default Navbar;