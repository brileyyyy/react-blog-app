import React, {useEffect} from 'react';
import {useDispatch, useSelector} from "react-redux";
import UsersItem from "../users-item/UsersItem";
import {getAllUsers} from "../../store/reducers/userReducer";

const UsersList = () => {
    const dispatch = useDispatch()
    const {users} = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch])

    return (
        <div className='my-6 bg-white rounded-md'>
            <div className='py-4'>
                {users.map((user, ind) =>
                    <UsersItem user={user} key={ind}/>
                )}
            </div>
        </div>
    );
};

export default UsersList;