import React from 'react';
import {useSelector} from "react-redux";

const UserInfo = ({user}) => {
    const {userPostsCount} = useSelector(state => state.post)
    const {userCommentsCount} = useSelector(state => state.comment)

    return (
        <div className='h-auto bg-white rounded-b-md'>
            <div className='flex flex-col items-center'>
                <div className='mt-24 mb-0.5 text-2xl font-bold'>
                    {user.name}
                </div>
                <div className='mb-6 text-l text-gray-500'>
                    {user.email}
                </div>
                <div className='mb-0.5 text-l text-gray-500'>
                    Посты: {userPostsCount}
                </div>
                <div className='mb-0.5 text-l text-gray-500'>
                    Комментарии: {userCommentsCount}
                </div>
                <div className='mb-10 text-l text-gray-500'>
                    Дата регистрации: {(user.createdAt).slice(0, 10)}
                </div>
            </div>
        </div>
    );
};

export default UserInfo;