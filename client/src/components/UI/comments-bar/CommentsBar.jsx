import React from 'react';
import UserComment from "../user-comment/UserComment";

const CommentsBar = () => {
    return (
        <div className='p-4 bg-white rounded-md'>
            <span className='font-bold'>
                Комментарии
            </span>
            <UserComment/>
            <UserComment/>
            <UserComment/>
        </div>
    );
};

export default CommentsBar;