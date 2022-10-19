import React, {useEffect, useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import Button from "../../components/UI/button/Button";
import {addComment, getPostComments} from "../../store/actions/commentActions";
import UserComment from "../../components/UI/user-comment/UserComment";

const PostPage = () => {
    const dispatch = useDispatch()
    const {currentPost} = useSelector(state => state.post)
    const {currentUser} = useSelector(state => state.user)
    const {postComments} = useSelector(state => state.comment)
    const [text, setText] = useState('')

    useEffect(() => {
        dispatch(getPostComments(currentPost))
    }, [dispatch])

    function addCommentHandler() {
        dispatch(addComment({author: currentUser.name, currentPost, avatar: currentUser.avatarUrl, text}))
        setText('')
    }

    return (
        <div className='my-10 mx-auto max-w-4xl '>
            <div className='bg-white rounded-md'>
                <img
                    className='h-96 w-full object-cover rounded-t-md'
                    src={currentPost.imageUrl}
                    alt="post preview"
                />
                <div className='flex flex-col p-6'>
                    <div className='mb-6 text-3xl text-gray-700 font-bold'>
                        {currentPost.title}
                    </div>
                    <div
                        className='mb-4 text-base text-gray-600'
                        dangerouslySetInnerHTML={{
                            __html: currentPost.description
                        }}
                    />
                    <div className='flex items-center text-xl text-gray-400 font-medium'>
                        {currentPost.tags.map(tag =>
                            <div key={tag}>
                                {tag}&nbsp;
                            </div>
                        )}
                    </div>
                </div>
            </div>
            <div className='h-auto mt-4 bg-white rounded-md'>
                <div className='flex flex-col p-6'>
                    <div className='mb-6 text-2xl text-gray-700 font-bold'>
                        Комментарии
                    </div>
                    <div className='flex items-center'>
                        <input
                            className='w-full my-1 px-4 p-2 border rounded-md outline-none'
                            type="text"
                            value={text}
                            placeholder='Comment..'
                            onChange={e => setText(e.target.value)}
                        />
                        <Button
                            className='btn-primary ml-4 bg-yellow-300'
                            onClick={() => addCommentHandler()}
                        >
                            Отправить
                        </Button>
                    </div>
                </div>
            </div>

            {postComments.length
                ?
                <div className='h-auto mt-4 py-2 bg-white rounded-md'>
                    {postComments.map((comment, ind) =>
                        <UserComment comment={comment} key={ind}/>
                    )}
                </div>
                :
                ''
            }
        </div>
    );
};

export default PostPage;