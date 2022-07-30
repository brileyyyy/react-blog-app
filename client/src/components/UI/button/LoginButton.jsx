import React from 'react';
import {useNavigate} from "react-router-dom";

const LoginButton = () => {
    const navigate = useNavigate()

    return (
        <button
            className='blue__btn mr-4'
            onClick={() => navigate('/login')}
        >
            Войти
        </button>
    );
};

export default LoginButton;