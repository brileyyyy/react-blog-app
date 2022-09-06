import React from 'react';
import {MdOutlineModeEdit} from "react-icons/md";
import {deletePost, getOnePost} from "../../../store/actions/postActions";
import {IoCloseSharp} from "react-icons/io5";
import {useDispatch} from "react-redux";

const PostEdits = ({post, navigate}) => {
    const dispatch = useDispatch()

    return (
        <div className='post__edits'>
            <MdOutlineModeEdit
                size={26}
                className='text-gray-300'
                onClick={() => dispatch(getOnePost({post, navigate, edit: true}))}
            />
            <IoCloseSharp
                size={26}
                className='ml-2 text-red-600'
                onClick={() => dispatch(deletePost(post))}
            />
        </div>
    );
};

export default PostEdits;