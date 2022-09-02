import React, {useEffect} from 'react';
import LeftSideMenu from "../../components/leftside-menu/LeftsideMenu";
import Navbar from "../../components/UI/navbar/Navbar";
import {useDispatch, useSelector} from "react-redux";
import {getAllUserPosts} from "../../store/reducers/postReducer";
import {getAllUserComments} from "../../store/reducers/commentReducer";
import LikedPostItem from "../../components/liked-post-item/LikedPostItem";
import {MdFileUpload} from "react-icons/md";
import {
    uploadUserAvatarBgImage, uploadUserAvatarImage
} from "../../store/reducers/uploadReducer";
import styles from './profilePage.module.scss'

const ProfilePage = () => {
    const dispatch = useDispatch()
    const {currentUser, selectedUser} = useSelector(state => state.user)
    const {userPosts, userPostsCount, isLoading} = useSelector(state => state.post)
    const {userCommentsCount} = useSelector(state => state.comment)

    useEffect(() => {
        dispatch(getAllUserPosts(selectedUser))
        dispatch(getAllUserComments(selectedUser))
    }, [dispatch])

    const uploadAvatarHandler = (e) => {
        try {
            const formData = new FormData()
            formData.append('image', e.target.files[0])
            dispatch(uploadUserAvatarImage(formData))
        } catch (err) {
            console.log(err)
        }
    }

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
                <div className={styles.info__wrapper}>
                    <div className={styles.info}>
                        <div className='mt-24 mb-0.5 text-2xl font-bold'>
                            {selectedUser.name}
                        </div>
                        <div className='mb-6 text-l text-gray-500'>
                            {selectedUser.email}
                        </div>
                        <div className='mb-0.5 text-l text-gray-500'>
                            Посты: {userPostsCount}
                        </div>
                        <div className='mb-0.5 text-l text-gray-500'>
                            Комментарии: {userCommentsCount}
                        </div>
                        <div className='mb-10 text-l text-gray-500'>
                            Дата регистрации: {(selectedUser.createdAt).slice(0, 10)}
                        </div>
                    </div>
                </div>
                <div className={styles.avatar__image__wrapper}>
                    <div className='absolute top-4 w-48 h-48 bg-black rounded-full'></div>
                    <img
                        className={styles.avatar__image}
                        src={selectedUser.avatarUrl}
                        alt='user-avatar'
                    />
                    {(currentUser._id === selectedUser._id) &&
                        <>
                            <label
                                htmlFor='main_image_uploads'
                                className={styles.avatar__upload__icon}
                            >
                                <MdFileUpload size={58}/>
                            </label>
                            <input
                                type='file' id='main_image_uploads' name='image'
                                className='absolute top-24 left-12 hidden'
                                onChange={e => uploadAvatarHandler(e)}
                            />
                        </>
                    }
                </div>
                <div className={styles.user__posts__list}>
                    {!isLoading && !userPosts.length &&
                        <div className={styles.no__posts__list__title}>
                            У пользователя пока нет постов
                        </div>
                    }
                    {isLoading
                        ?
                        <div className='post__loading'>
                            Загрузка...
                        </div>
                        :
                        userPosts.length ?
                            <div>
                                <div className={styles.posts__list__title}>
                                    Посты пользователя
                                </div>
                                <div className='grid grid-cols-3 gap-x-4 gap-y-7'>
                                    {userPosts.map(post =>
                                        <LikedPostItem post={post} key={post._id}/>
                                    )}
                                </div>
                            </div> : ''
                    }
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;