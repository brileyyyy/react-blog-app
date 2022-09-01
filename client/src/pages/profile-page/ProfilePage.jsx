import React, {useEffect} from 'react';
import LeftSideMenu from "../../components/leftside-menu/LeftsideMenu";
import Navbar from "../../components/UI/navbar/Navbar";
import {useDispatch, useSelector} from "react-redux";
import {getAllUserPosts} from "../../store/reducers/postReducer";
import {getAllUserComments} from "../../store/reducers/commentReducer";
import LikedPostItem from "../../components/liked-post-item/LikedPostItem";
import styles from './profilePage.module.scss'

const ProfilePage = () => {
    const dispatch = useDispatch()
    const {selectedUser} = useSelector(state => state.user)
    const {userPosts, userPostsCount, isLoading} = useSelector(state => state.post)
    const {userCommentsCount} = useSelector(state => state.comment)

    useEffect(() => {
        dispatch(getAllUserPosts(selectedUser))
        dispatch(getAllUserComments(selectedUser))
    }, [dispatch])

    return (
        <div className={styles.wrapper}>
            <LeftSideMenu/>
            <div className='relative'>
                <Navbar/>
                <div className='mt-6 h-60'>
                    <img className={styles.bg__image}
                        src='http://pm1.narvii.com/8033/d41be839fb99aece3de1d2e68fb69a617f926de1r1-1079-609v2_uhq.jpg'
                        alt='profile-background'
                    />
                </div>
                <div className={styles.info__wrapper}>
                    <div className={styles.info}>
                        <div className='mt-20 mb-0.5 text-2xl font-bold'>
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
                <img
                    className={styles.avatar__image}
                    src='https://lazarevka-house.ru/wp-content/uploads/2021/05/ico.jpg'
                    alt='user-avatar'
                />
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