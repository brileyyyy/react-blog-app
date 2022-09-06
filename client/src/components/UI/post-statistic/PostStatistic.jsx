import React, {useState} from 'react';
import {AiFillHeart, AiOutlineHeart} from "react-icons/ai";
import {BiComment} from "react-icons/bi";
import {GoEye} from "react-icons/go";
import {useDispatch, useSelector} from "react-redux";
import {createLikedPost, deleteLikedPost} from "../../../store/actions/likedPostActions";
import '../../post-item/postItem.scss'

const PostStatistic = ({post}) => {
    const dispatch = useDispatch()
    const {currentUser} = useSelector(state => state.user)
    const [like, setLike] = useState(false)
    const [unLike, setUnLike] = useState(false)
    const likedUser = post.likes.find(like => like === currentUser._id)

    const createLikedPostHandler = () => {
        setLike(true)
        dispatch(createLikedPost(post))
    }

    const removeFromLikedHandler = () => {
        setUnLike(true)
        dispatch(deleteLikedPost(post))
    }

    return (
        <div className='post__statistic'>
            <div className='flex items-center'>
                <div className='mr-4 flex items-center'>
                    {(likedUser ? ((likedUser && !unLike) ? likedUser : like) : (like && !unLike))
                        ?
                        <AiFillHeart
                            size={22}
                            className='mr-2 text-red-500'
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