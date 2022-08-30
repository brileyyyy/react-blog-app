import React from 'react';
import {useNavigate} from "react-router-dom";
import PostStatistic from "../UI/post-statistic/PostStatistic";
import {useDispatch} from "react-redux";
import {getOnePost} from "../../store/reducers/postReducer";

const LikedPostItem = ({post}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <div>
            <div className='container'>
                <img
                    className='post__image'
                    src="https://proprikol.ru/wp-content/uploads/2020/06/kartinki-zavtrak-35.jpg"
                    alt="post background"
                    onClick={() => dispatch(getOnePost({post, navigate, edit: false}))}
                />
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

export default LikedPostItem;