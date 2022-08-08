import React from 'react';
import {useSelector} from "react-redux";

const PostPage = () => {
    const {currentPost} = useSelector(state => state.post)

    return (
        <div className='mx-auto max-w-4xl bg-white'>
            <div className='flex flex-col p-6'>
                <div className='mb-6 text-3xl text-gray-700 font-bold'>
                    {currentPost.title}
                </div>
                <div className='mb-4 text-base text-gray-600'>
                    {currentPost.description}
                </div>
                <div className='flex items-center text-xl text-gray-400 font-medium'>
                    {currentPost.tags.map(tag =>
                        <div key={tag}>
                            {tag}&nbsp;
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PostPage;