import React from 'react';
import PostStatistic from "../UI/post-statistic/PostStatistic";
import {MdClose, MdDeleteOutline, MdOutlineModeEdit} from "react-icons/md";
import './postItem.scss'
import {IoCloseSharp} from "react-icons/io5";

const PostItem = ({post}) => {
    return (
        <div>
            <div className='container'>
                <img
                    className='post__image'
                    src="https://proprikol.ru/wp-content/uploads/2020/06/kartinki-zavtrak-35.jpg"
                    alt="photo"
                />
                <div className='post__edits'>
                    <MdOutlineModeEdit size={26}/>
                    <IoCloseSharp size={26} className='ml-2 text-red-700'/>
                </div>
                <PostStatistic/>
            </div>
            <div className='pt-2 px-2'>
                <div className='font-medium'>
                    {post.title}
                </div>
                <div className='post__author'>
                    <div>User</div>
                    <span className='px-2'>&bull;</span>
                    <div>10:00, Jun 23 2022</div>
                </div>
            </div>
        </div>
    );
};

export default PostItem;