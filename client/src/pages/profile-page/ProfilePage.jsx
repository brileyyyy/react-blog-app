import React, {useEffect} from 'react';
import LeftSideMenu from "../../components/leftside-menu/LeftsideMenu";
import Navbar from "../../components/UI/navbar/Navbar";
import {useDispatch, useSelector} from "react-redux";
import {getAllUserPosts} from "../../store/reducers/postReducer";
import {getAllUserComments} from "../../store/reducers/commentReducer";
import {MdFileUpload} from "react-icons/md";
import {uploadUserAvatarBgImage} from "../../store/reducers/uploadReducer";
import UserPostList from "../../components/user-post-list/UserPostList";
import styles from './profilePage.module.scss'
import UserAvatar from "../../components/UI/user-avatar/UserAvatar";
import UserInfo from "../../components/UI/user-info/UserInfo";

const ProfilePage = () => {
    const dispatch = useDispatch()
    const {currentUser, selectedUser} = useSelector(state => state.user)

    useEffect(() => {
        dispatch(getAllUserPosts(selectedUser))
        dispatch(getAllUserComments(selectedUser))
    }, [dispatch])

    const uploadBgAvatarHandler = (e) => {
        try {
            const formData = new FormData()
            formData.append('image', e.target.files[0])
            dispatch(uploadUserAvatarBgImage(formData))
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className={styles.wrapper}>
            <LeftSideMenu/>
            <div className='relative'>
                <Navbar/>
                <div className={styles.bg__image__wrapper}>
                    <img className={styles.bg__image}
                        src={selectedUser.backgroundAvatarUrl}
                        alt='profile-background'
                    />
                    {(currentUser._id === selectedUser._id) &&
                        <>
                            <label
                                htmlFor='bg_image_uploads'
                                className={styles.bg__upload__icon}
                            >
                                <MdFileUpload size={42}/>
                            </label>
                            <input
                                type='file' id='bg_image_uploads' name='image'
                                className='hidden' onChange={e => uploadBgAvatarHandler(e)}
                            />
                        </>
                    }
                </div>
                <UserInfo user={selectedUser}/>
                <UserAvatar/>
                <UserPostList/>
            </div>
        </div>
    );
};

export default ProfilePage;