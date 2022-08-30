import React from 'react';
import {MdOutlineModeEdit} from "react-icons/md";
import {deletePost, getOnePost} from "../../../store/reducers/postReducer";
import {IoCloseSharp} from "react-icons/io5";
import {useDispatch} from "react-redux";

const PostEdits = ({post, navigate}) => {
    const dispatch = useDispatch()

    return (
        <div className='post__edits'>
            <MdOutlineModeEdit
                size={26}
                onClick={() => dispatch(getOnePost({post, navigate, edit: true}))}
            />
            <IoCloseSharp
                size={26}
                className='ml-2 text-red-700'
                onClick={() => dispatch(deletePost(post))}
            />
        </div>
    );
};

export default PostEdits;