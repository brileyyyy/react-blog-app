import React from 'react';
import {MdFileUpload} from "react-icons/md";
import {deleteUserAvatarBgImage, uploadUserAvatarBgImage} from "../../../store/reducers/uploadReducer";
import {useDispatch, useSelector} from "react-redux";
import {IoMdClose} from "react-icons/io";
import './userBackgroundAvatar.scss'

const UserBackgroundAvatar = ({user}) => {
    const dispatch = useDispatch()
    const {currentUser} = useSelector(state => state.user)
    const {userBgAvatarImageUrl} = useSelector(state => state.upload)

    const uploadBgAvatarHandler = (e) => {
        try {
            const formData = new FormData()
            formData.append('image', e.target.files[0])
            dispatch(uploadUserAvatarBgImage(formData))
        } catch (err) {
            console.log(err)
        }
    }

    const deleteBgAvatarHandler = () => {
        const fileUrl = (userBgAvatarImageUrl ? userBgAvatarImageUrl : user.backgroundAvatarUrl)
        dispatch(deleteUserAvatarBgImage(fileUrl))
    }

    return (
        <div className='bg__image__wrapper'>
            <img className='bg__image'
                 src={userBgAvatarImageUrl ? userBgAvatarImageUrl : user.backgroundAvatarUrl}
                 alt='profile-background'
            />
            {(currentUser._id === user._id) &&
                <>
                    <label htmlFor='bg_image_uploads'>
                        <MdFileUpload
                            size={40}
                            className='bg__upload__icon'
                        />
                    </label>
                    <input
                        type='file' id='bg_image_uploads' name='image'
                        className='hidden' onChange={e => uploadBgAvatarHandler(e)}
                    />
                    <IoMdClose
                        size={32}
                        className='bg__delete__icon'
                        onClick={deleteBgAvatarHandler}
                    />
                </>
            }
        </div>
    );
};

export default UserBackgroundAvatar;