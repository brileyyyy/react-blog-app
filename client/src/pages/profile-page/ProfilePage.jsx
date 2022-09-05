import React, {useEffect} from 'react';
import LeftSideMenu from "../../components/leftside-menu/LeftsideMenu";
import Navbar from "../../components/UI/navbar/Navbar";
import {useDispatch, useSelector} from "react-redux";
import {getAllUserPosts} from "../../store/reducers/postReducer";
import {getAllUserComments} from "../../store/reducers/commentReducer";
import UserPostList from "../../components/user-post-list/UserPostList";
import UserAvatar from "../../components/UI/user-avatar/UserAvatar";
import UserInfo from "../../components/UI/user-info/UserInfo";
import UserBackgroundAvatar from "../../components/UI/user-background-avatar/UserBackgroundAvatar";

const ProfilePage = () => {
    const dispatch = useDispatch()
    const {selectedUser} = useSelector(state => state.userProfile)

    useEffect(() => {
        dispatch(getAllUserPosts(selectedUser))
        dispatch(getAllUserComments(selectedUser))
    }, [dispatch])

    return (
        <div className='mx-auto max-w-7xl grid grid-primary gap-6'>
            <LeftSideMenu/>
            <div className='relative'>
                <Navbar/>
                <UserBackgroundAvatar user={selectedUser}/>
                <UserInfo user={selectedUser}/>
                <UserAvatar user={selectedUser}/>
                <UserPostList/>
            </div>
        </div>
    );
};

export default ProfilePage;