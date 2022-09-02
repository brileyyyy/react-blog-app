import React from 'react';
import {useNavigate} from "react-router-dom";
import PostStatistic from "../UI/post-statistic/PostStatistic";
import PostEdits from "../UI/post-edits/PostEdits";
import {useDispatch} from "react-redux";
import {getOnePost} from "../../store/reducers/postReducer";
import './postItem.scss'

const PostItem = ({post}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <div>
            <div className='container'>
                <img
                    className='post__image'
                    src={post.imageUrl}
                    alt="post background"
                    onClick={() => dispatch(getOnePost({post, navigate, edit: false}))}
                />
                <PostEdits post={post} navigate={navigate}/>
                <PostStatistic post={post}/>
            </div>
            <div className='pt-2 px-2'>
                <div className='font-medium'>
                    {post.title}
                </div>
                <div className='post__author'>
                    <div>{post.author}</div>
                    <span className='px-2'>&bull;</span>
                    <div>{(post.createdAt).slice(0, 10)}</div>
                </div>
            </div>
        </div>
    );
};

export default PostItem;