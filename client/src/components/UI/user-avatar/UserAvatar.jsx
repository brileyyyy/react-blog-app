import React from 'react';
import {MdFileUpload} from "react-icons/md";
import {useDispatch, useSelector} from "react-redux";
import {uploadUserAvatarImage} from "../../../store/reducers/uploadReducer";
import './userAvatar.scss'

const UserAvatar = () => {
    const dispatch = useDispatch()
    const {currentUser, selectedUser} = useSelector(state => state.user)

    const uploadAvatarHandler = (e) => {
        try {
            const formData = new FormData()
            formData.append('image', e.target.files[0])
            dispatch(uploadUserAvatarImage(formData))
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='avatar__image__wrapper'>
            <div className='absolute top-4 w-48 h-48 bg-black rounded-full'></div>
            <img
                className='avatar__image'
                src={selectedUser.avatarUrl}
                alt='user-avatar'
            />
            {(currentUser._id === selectedUser._id) &&
                <>
                    <label
                        htmlFor='main_image_uploads'
                        className='avatar__upload__icon'
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
    );
};

export default UserAvatar;