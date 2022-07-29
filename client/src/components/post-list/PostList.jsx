import React from 'react';
import PostItem from "../post-item/PostItem";
import './postList.scss'

const PostList = () => {
    const posts = [
        {id: 1, title: 'React JS new features'},
        {id: 2, title: 'React JS new features'},
        {id: 3, title: 'React JS new features'},
        {id: 4, title: 'React JS new features'},
        {id: 5, title: 'React JS new features'},
        {id: 6, title: 'React JS new features'},
        {id: 7, title: 'React JS new features'},
        {id: 8, title: 'React JS new features'},
        {id: 9, title: 'React JS new features'},
        {id: 10, title: 'React JS new features'},
        {id: 11, title: 'React JS new features'},
    ]

    return (
        <div className='my-6 bg-white rounded-md'>
            <div className='list__sections'>
                <span className='mr-6'>Новые</span>
                <span className='text-neutral-400'>Популярные</span>
            </div>
            <div className='post__list'>
                {posts.map(post => <PostItem post={post} key={post.id}/>)}
            </div>
        </div>

    );
};

export default PostList;