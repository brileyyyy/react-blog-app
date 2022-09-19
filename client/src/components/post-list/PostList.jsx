import React, {memo, useEffect} from 'react';
import PostItem from "../post-item/PostItem";
import {useDispatch, useSelector} from "react-redux";
import {getAllPosts} from "../../store/actions/postActions";
import {setPostSortValue} from "../../store/reducers/postReducer";
import './postList.scss'

const PostList = memo(() => {
    const dispatch = useDispatch()
    const {posts, postSortValue, isLoading} = useSelector(state => state.post)

    useEffect(() => {
        dispatch(getAllPosts(postSortValue))
        dispatch(setPostSortValue({sortType: 'all'}))
    }, [dispatch])

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
                posts.length ?
                <div className='post__list'>
                    {posts.map(post => <PostItem post={post} key={post._id}/>)}
                </div> : ''
            }
        </div>
    );
});

export default PostList;