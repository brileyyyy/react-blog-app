import React, {memo, useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {getAllComments} from "../../../store/actions/commentActions";
import CommentsBarItem from "../comments-bar-item/CommentsBarItem";

const CommentsBar = memo(() => {
    const dispatch = useDispatch()
    const {comments} = useSelector(state => state.comment)

    useEffect(() => {
        dispatch(getAllComments())
    }, [dispatch])

    return (
        <div className='mb-4 p-4 bg-white rounded-md'>
            <span className='font-bold'>
                Новые комментарии
            </span>
            {comments.length
                ?
                <div className='mt-3'>
                    {comments.map(comment =>
                        <CommentsBarItem comment={comment} key={comment._id}/>
                    )}
                </div>
                :
                <div className='mt-3 text-l text-gray-400 font-medium'>
                    Тут появятся недавние комментарии
                </div>
            }

        </div>
    );
});

export default CommentsBar;