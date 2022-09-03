import React from 'react';
import {MdFileUpload} from "react-icons/md";
import {useDispatch, useSelector} from "react-redux";
import {deleteUserAvatarImage, uploadUserAvatarImage} from "../../../store/reducers/uploadReducer";
import {IoMdClose} from "react-icons/io";
import './userAvatar.scss'

const UserAvatar = () => {
    const dispatch = useDispatch()
    const {currentUser, selectedUser} = useSelector(state => state.user)
    const {userAvatarImageUrl} = useSelector(state => state.upload)

    const uploadAvatarHandler = (e) => {
        try {
            const formData = new FormData()
            formData.append('image', e.target.files[0])
            dispatch(uploadUserAvatarImage(formData))
        } catch (err) {
            console.log(err)
        }
    }

    const deleteAvatarHandler = () => {
        const fileUrl = (userAvatarImageUrl ? userAvatarImageUrl : selectedUser.avatarUrl)
        dispatch(deleteUserAvatarImage(fileUrl))
    }

    return (
        <div className='avatar__image__wrapper'>
            <div className='absolute top-2 w-48 h-48 bg-black rounded-full'></div>
            <img
                className='avatar__image'
                src={userAvatarImageUrl ? userAvatarImageUrl : selectedUser.avatarUrl}
                alt='user-avatar'
            />
            {(currentUser._id === selectedUser._id) &&
                <>
                    <div className='avatar__icon__wrapper'>
                        <label
                            htmlFor='main_image_uploads'
                            className='avatar__icon'
                        >
                            <MdFileUpload size={40}/>
                        </label>
                        <IoMdClose
                            size={32}
                            className='avatar__icon'
                            onClick={deleteAvatarHandler}
                        />
                    </div>
                    <input
                        type='file' id='main_image_uploads' name='image'
                        className='absolute top-24 left-12 hidden'
                        onChange={e => uploadAvatarHandler(e)}
                    />
                </>
            }
        </div>
    );
};

export default UserAvatar;