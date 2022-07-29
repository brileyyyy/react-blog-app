import React from 'react';

const UserComment = () => {
    return (
        <div className='mt-6'>
            <div className='mb-2 flex items-center'>
                <img
                    className='mr-2 w-12 h-12 object-cover rounded-full'
                    src='images/briley.jpg'
                    alt='user-avatar'
                />
                <div>
                    <div className='text-l font-medium'>User</div>
                    <div className='text-sm text-neutral-400'>10:02, Jun 23 2022</div>
                </div>
            </div>
            <div className='text-sm text-neutral-400'>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, unde.
            </div>
        </div>
    );
};

export default UserComment;