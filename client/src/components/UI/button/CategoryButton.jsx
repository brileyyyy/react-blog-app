import React from 'react';
import {useNavigate} from "react-router-dom";
import {BiCategoryAlt} from "react-icons/bi";

const CategoryButton = () => {
    const navigate = useNavigate()

    return (
        <button
            className='green__btn'
            onClick={() => navigate('/categories')}
        >
            <BiCategoryAlt size={20} className='mr-2'/>
            <span>Категории</span>
        </button>
    );
};

export default CategoryButton;