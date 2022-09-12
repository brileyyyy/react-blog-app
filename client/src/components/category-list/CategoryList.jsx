import React from 'react';
import CategoryItem from "../category-item/CategoryItem";

const categories = [
    {id: 1, title: 'Programming', image: 'images/categories/category_code.jpg', tag: '#programming'},
    {id: 2, title: 'Music', image: 'images/categories/category_music.jpg', tag: '#music'},
    {id: 3, title: 'Art', image: 'images/categories/category_art.jpg', tag: '#art'},
    {id: 4, title: 'Sports', image: 'images/categories/category_sports.jpg', tag: '#sports'},
    {id: 5, title: 'React', image: 'images/categories/category_react.jpg', tag: '#react'},
    {id: 6, title: 'Travels', image: 'images/categories/category_travels.png', tag: '#travel'}
]

const CategoryList = () => {
    return (
        <div className='my-6 bg-white rounded-md'>
            <div className='list__sections'>
                <span>Все категории</span>
            </div>
            <div className='post__list'>
                {categories.map(category => <CategoryItem category={category} key={category.id}/>)}
            </div>
        </div>
    );
};

export default CategoryList;