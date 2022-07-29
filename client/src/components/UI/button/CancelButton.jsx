import React from 'react';
import {useNavigate} from "react-router-dom";

const CancelButton = () => {
    const navigate = useNavigate()

    return (
        <button
            className='cancel__btn'
            onClick={() => navigate('/')}
        >
            <span>Отмена</span>
        </button>
    );
};

export default CancelButton;