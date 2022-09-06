import React from 'react';
import {useNavigate} from "react-router-dom";
import PostStatistic from "../UI/post-statistic/PostStatistic";
import PostEdits from "../UI/post-edits/PostEdits";
import {useDispatch, useSelector} from "react-redux";
import {getOnePost} from "../../store/actions/postActions";
import './postItem.scss'

const PostItem = ({post}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {currentUser} = useSelector(state => state.user)

    return (
        <div>
            <div className='container'>
                <img
                    className='post__image'
                    src={post.imageUrl}
                    alt="post background"
                    onClick={() => dispatch(getOnePost({post, navigate, edit: false}))}
                />
                {currentUser.name === post.author &&
                    <PostEdits post={post} navigate={navigate}/>
                }
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