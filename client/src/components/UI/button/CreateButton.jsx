import React from 'react';
import {useNavigate} from "react-router-dom";
import './button.scss'

const CreateButton = () => {
    const navigate = useNavigate()

    return (
        <button
            className='blue__btn ml-auto mr-6'
            onClick={() => navigate('/create')}
        >
            <span>Создать пост</span>
        </button>
    );
};

export default CreateButton;