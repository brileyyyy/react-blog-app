import React from 'react';
import {useNavigate} from "react-router-dom";

const RegistrationButton = () => {
    const navigate = useNavigate()

    return (
        <button
            className='green__btn'
            onClick={() => navigate('/register')}
        >
            Регистрация
        </button>
    );
};

export default RegistrationButton;