import React from 'react';

const UsersItem = ({user}) => {
    return (
        <div className='px-6 py-4 flex items-center hover:bg-gray-50 transition cursor-pointer'>
            <img
                className='mr-4 w-12 h-12 object-cover rounded-full'
                src='../images/briley.jpg'
                alt='avatar'/>
            <div>
                <div className='text-l font-medium'>
                    {user.name}
                </div>
                <div className='text-sm text-gray-400'>
                    {user.email}
                </div>
            </div>
        </div>
    );
};

export default UsersItem;