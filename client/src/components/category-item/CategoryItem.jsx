import React from 'react';
import './categoryItem.scss'

const CategoryItem = ({post}) => {
    return (
        <div>
            <div className='container'>
                <img
                    className='category__image'
                    src="https://proprikol.ru/wp-content/uploads/2020/06/kartinki-zavtrak-35.jpg"
                    alt="photo"
                />
                <div className='category__title'>
                    {post.title}
                </div>
            </div>
        </div>
    );
};

export default CategoryItem;