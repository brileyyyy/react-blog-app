import React from 'react';
import {MdFileUpload} from "react-icons/md";
import {deleteUserAvatarBgImage, uploadUserAvatarBgImage} from "../../../store/reducers/userReducer";
import {useDispatch, useSelector} from "react-redux";
import {IoMdClose} from "react-icons/io";
import './userBackgroundAvatar.scss'

const UserBackgroundAvatar = ({user}) => {
    const dispatch = useDispatch()
    const {currentUser} = useSelector(state => state.user)

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
        <div className='bg__image__wrapper'>
            {(currentUser._id === user._id)
                ?
                <>
                    <img className='bg__image'
                         src={currentUser.backgroundAvatarUrl}
                         alt='profile-background'
                    />
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
                        onClick={() => dispatch(deleteUserAvatarBgImage(user.backgroundAvatarUrl))}
                    />
                </>
                :
                <img className='bg__image'
                     src={user.backgroundAvatarUrl}
                     alt='profile-background'
                />
            }
        </div>
    );
};

export default UserBackgroundAvatar;