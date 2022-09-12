import React from 'react';
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {setPostSortValue} from "../../store/reducers/postReducer";
import './categoryItem.scss'

const CategoryItem = ({category}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    const postsByCategoryHandler = () => {
        dispatch(setPostSortValue({sortType: 'category', sortValue: category.tag}))
        navigate('/')
    }

    return (
        <div>
            <div className='container' onClick={postsByCategoryHandler}>
                <img
                    className='category__image'
                    src={category.image}
                    alt="category background"
                />
                <div className='category__title'>
                    {category.title}
                </div>
            </div>
        </div>
    );
};

export default CategoryItem;