import React, {memo} from 'react';
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getOnePostByComment} from "../../../store/actions/postActions";

const CommentsBarItem = memo(({comment}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <div
            className='py-3 hover:bg-gray-50 rounded-md cursor-pointer'
            onClick={() => dispatch(getOnePostByComment({comment, navigate, edit: false}))}
        >
            <div className='px-6 flex justify-between'>
                <div className='mb-1 flex items-center'>
                    <img
                        className='mr-4 w-12 h-12 object-cover rounded-full'
                        src={comment.avatar}
                        alt='avatar'
                    />
                    <div>
                        <div className='text-l font-medium'>
                            {comment.author}
                        </div>
                        <div className='text-sm text-gray-400'>
                            {(comment.createdAt).slice(0,10)}
                        </div>
                    </div>
                </div>
            </div>
            <div className='px-6 ml-16'>
                <div className='text-l text-gray-600'>
                    {comment.text}
                </div>
            </div>
        </div>
    );
});

export default CommentsBarItem;