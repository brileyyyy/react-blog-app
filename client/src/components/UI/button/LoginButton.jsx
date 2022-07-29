import React from 'react';
import {useNavigate} from "react-router-dom";

const LoginButton = () => {
    const navigate = useNavigate()

    return (
        <button
            className='blue__btn'
            onClick={() => navigate('/login')}
        >
            Вход
        </button>
    );
};

export default LoginButton;