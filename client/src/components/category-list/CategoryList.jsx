import React from 'react';
import CategoryItem from "../category-item/CategoryItem";

const CategoryList = () => {
    const posts = [
        {id: 1, title: 'IT'},
        {id: 2, title: 'Music'},
        {id: 3, title: 'Art'},
        {id: 4, title: 'Programming'},
        {id: 5, title: 'React'},
        {id: 6, title: 'Football'},
        {id: 7, title: 'Netherlands'},
    ]

    return (
        <div className='my-6 bg-white rounded-md'>
            <div className='list__sections'>
                <span className=''>Все категории</span>
            </div>
            <div className='post__list'>
                {posts.map(post => <CategoryItem post={post} key={post.id}/>)}
            </div>
        </div>

    );
};

export default CategoryList;