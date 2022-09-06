import React, {useEffect} from 'react';
import LikedPostItem from "../liked-post-item/LikedPostItem";
import {useDispatch, useSelector} from "react-redux";
import {getLikedPosts} from "../../store/actions/likedPostActions";

const LikedPostList = () => {
    const dispatch = useDispatch()
    const {likedPosts, isLoading} = useSelector(state => state.likedPost)

    useEffect(() => {
        dispatch(getLikedPosts())
    }, [dispatch])

    return (
        <div className='my-6 bg-white rounded-md'>
            <div className='list__sections'>
                <span>Новые</span>
            </div>
            {!isLoading && !likedPosts.length &&
                <div className='no__post'>
                    В избранном пока ничего нет
                </div>
            }
            {isLoading
                ?
                <div className='post__loading'>
                    Загрузка...
                </div>
                :
                likedPosts.length ?
                <div className='post__list'>
                    {likedPosts.map((likedPost, ind) =>
                        <LikedPostItem post={likedPost} key={ind}/>
                    )}
                </div> : ''
            }
        </div>
    );
};

export default LikedPostList;