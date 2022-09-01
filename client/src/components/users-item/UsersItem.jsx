import React from 'react';
import {useDispatch} from "react-redux";
import {useNavigate} from "react-router-dom";
import {getOneUser} from "../../store/reducers/userReducer";

const UsersItem = ({user}) => {
    const dispatch = useDispatch()
    const navigate = useNavigate()

    return (
        <div
            className='px-6 py-4 flex items-center hover:bg-gray-50 transition cursor-pointer'
            onClick={() => dispatch(getOneUser({user, navigate}))}
        >
            <img
                className='mr-4 w-12 h-12 object-cover rounded-full'
                src={user.avatarURL}
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