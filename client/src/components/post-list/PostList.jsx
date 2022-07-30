import React, {useEffect} from 'react';
import PostItem from "../post-item/PostItem";
import {useDispatch, useSelector} from "react-redux";
import {getAllPosts} from "../../store/reducers/postReducer";
import './postList.scss'

const PostList = () => {
    const dispatch = useDispatch()
    const {posts, isLoading} = useSelector(state => state.post)

    useEffect(() => {
        dispatch(getAllPosts())
    }, [])

    return (
        <div className='my-6 bg-white rounded-md'>
            <div className='list__sections'>
                <span className='mr-6'>Новые</span>
                <span className='text-gray-400'>Популярные</span>
            </div>
            {!isLoading && !posts.length &&
                <div className='no__post'>
                    Постов пока нет
                </div>
            }
            {isLoading
                ?
                <div className='post__loading'>
                    Загрузка...
                </div>
                :
                <div className='post__list'>
                    {posts.map(post => <PostItem post={post} key={post._id}/>)}
                </div>
            }
        </div>
    );
};

export default PostList;