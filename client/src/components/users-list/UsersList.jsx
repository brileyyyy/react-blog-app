import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import UsersItem from "../users-item/UsersItem";
import {getAllUsers} from "../../store/actions/userActions";

const UsersList = () => {
    const dispatch = useDispatch()
    const {users, isLoading} = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch])

    return (
        <div className='my-6 bg-white rounded-md'>
            {isLoading
                ?
                <div className='py-8 text-l text-gray-400 text-center font-medium'>
                    Загрузка...
                </div>
                :
                <div className='py-4'>
                    {users.map((user, ind) =>
                        <UsersItem user={user} key={ind}/>
                    )}
                </div>
            }
        </div>
    );
};

export default UsersList;