import React from 'react';
import {useSelector} from "react-redux";
import LikedPostItem from "../liked-post-item/LikedPostItem";

const UserPostList = () => {
    const {userPosts, isLoading} = useSelector(state => state.post)

    return (
        <div className='p-6 my-4 bg-white rounded-md'>
            {!isLoading && !userPosts.length &&
                <div className='flex justify-center items-center font-medium'>
                    У пользователя пока нет постов
                </div>
            }
            {isLoading
                ?
                <div className='py-8 text-l text-gray-400 text-center font-medium'>
                    Загрузка...
                </div>
                :
                userPosts.length ?
                    <div>
                        <div className='mb-6 flex justify-center items-center font-medium'>
                            Посты пользователя
                        </div>
                        <div className='grid grid-cols-3 gap-x-4 gap-y-7'>
                            {userPosts.map(post =>
                                <LikedPostItem post={post} key={post._id}/>
                            )}
                        </div>
                    </div> : ''
            }
        </div>
    );
};

export default UserPostList;