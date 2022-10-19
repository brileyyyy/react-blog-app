import React, {memo, useEffect, useState} from 'react';
import PostItem from "../post-item/PostItem";
import {useDispatch, useSelector} from "react-redux";
import {getAllPosts, getPopularPosts} from "../../store/actions/postActions";
import {setPostSortValue} from "../../store/reducers/postReducer";
import './postList.scss'

const PostList = memo(() => {
    const dispatch = useDispatch()
    const {posts, postSortValue, isLoading} = useSelector(state => state.post)
    const [select, setSelect] = useState('new')

    useEffect(() => {
        dispatch(getAllPosts(postSortValue))
        dispatch(setPostSortValue({sortType: 'all'}))
    }, [dispatch])

    const selectNewHandler = () => {
        dispatch(getAllPosts(postSortValue))
        setSelect('new')
    }

    const selectPopularHandler = () => {
        dispatch(getPopularPosts())
        setSelect('popular')
    }

    return (
        <div className='my-6 bg-white rounded-md'>
            <div className='list__sections'>
                <span
                    className={`${select === 'popular' && 'text-gray-400'} mr-6 cursor-pointer`}
                    onClick={() => selectNewHandler()}
                >
                    Новые
                </span>
                <span
                    className={`${select === 'new' && 'text-gray-400'} cursor-pointer`}
                    onClick={() => selectPopularHandler()}
                >
                    Популярные
                </span>
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