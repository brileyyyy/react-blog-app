import React from 'react';
import {MdFileUpload} from "react-icons/md";
import {uploadUserAvatarBgImage} from "../../../store/reducers/uploadReducer";
import {useDispatch, useSelector} from "react-redux";
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

    return (
        <div className='bg__image__wrapper'>
            <img className='bg__image'
                 src={userBgAvatarImageUrl ? userBgAvatarImageUrl : user.backgroundAvatarUrl}
                 alt='profile-background'
            />
            {(currentUser._id === user._id) &&
                <>
                    <label
                        htmlFor='bg_image_uploads'
                        className='bg__upload__icon'
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
    );
};

export default UserBackgroundAvatar;