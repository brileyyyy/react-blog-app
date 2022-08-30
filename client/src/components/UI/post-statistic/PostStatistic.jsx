import React, {useState} from 'react';
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import {BiComment} from "react-icons/bi";
import {GoEye} from "react-icons/go";
import {useDispatch} from "react-redux";
import {
    createLikedPost, deleteLikedPost
} from "../../../store/reducers/likedPostReducer";
import '../../post-item/postItem.scss'

const PostStatistic = ({post}) => {
    const dispatch = useDispatch()
    const [liked, setLiked] = useState(post.liked)

    const createLikedPostHandler = () => {
        setLiked(true)
        dispatch(createLikedPost(post))
    }

    const removeFromLikedHandler = () => {
        setLiked(false)
        dispatch(deleteLikedPost(post))
    }

    return (
        <div className='post__statistic'>
            <div className='flex items-center'>
                <div className='mr-4 flex items-center'>
                    {liked
                        ?
                        <AiFillHeart size={20} className='mr-2 text-red-500'
                            onClick={removeFromLikedHandler}
                        />
                        :
                        <AiOutlineHeart
                            size={22}
                            className='mr-2'
                            onClick={createLikedPostHandler}
                        />
                    }
                </div>
                <div className='flex items-center'>
                    <BiComment size={20} className='mr-2'/>
                    <span className='text-lg'>{post.commentsCount}</span>
                </div>
            </div>
            <div className='flex items-center'>
                <GoEye size={20} className='mr-2'/>
                <span className='text-lg'>{post.viewsCount}</span>
            </div>
        </div>
    );
};

export default PostStatistic;