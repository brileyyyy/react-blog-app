import React from 'react';
import {AiOutlineHeart} from "react-icons/ai";
import {BiComment} from "react-icons/bi";
import {GoEye} from "react-icons/go";
import '../../post-item/postItem.scss'

const PostStatistic = () => {
    return (
        <div className='post__statistic'>
            <div className='flex items-center'>
                <div className='mr-6 flex items-center'>
                    <AiOutlineHeart size={20} className='mr-2'/>
                    <span className='text-lg'>0</span>
                </div>
                <div className='flex items-center'>
                    <BiComment size={20} className='mr-2'/>
                    <span className='text-lg'>0</span>
                </div>
            </div>
            <div className='flex items-center'>
                <GoEye size={20} className='mr-2'/>
                <span className='text-lg'>0</span>
            </div>
        </div>
    );
};

export default PostStatistic;