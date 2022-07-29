import React from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch} from "react-redux";
import {createPost} from "../../../store/reducers/postReducer";

const PostButton = ({data}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    function createPostHandler() {
        navigate('/')
        dispatch(createPost(data))
    }

    return (
        <button
            className='blue__btn mr-4'
            onClick={() => createPostHandler()}
        >
            <span>Опубликовать</span>
        </button>
    );
};

export default PostButton;