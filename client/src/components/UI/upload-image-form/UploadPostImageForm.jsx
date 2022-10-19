import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {uploadPostImage} from "../../../store/actions/postActions";
import './uploadPostImageForm.scss'

const UploadPostImageForm = () => {
    const dispatch = useDispatch()
    const {postImageUrl} = useSelector(state => state.post)

    const uploadImageHandler = async (e) => {
        try {
            const formData = new FormData()
            formData.append('image', e.target.files[0])
            dispatch(uploadPostImage(formData))
        } catch (err) {
            console.log(err)
        }
    }

    return (
        <div className='upload__wrapper'>
            {!postImageUrl
                ?
                <div className='upload__field'>
                    <span className='upload__title'>
                        Загрузите картинку
                    </span>
                    <div className='upload__input'>
                        <label
                            htmlFor='image_uploads'
                            className='upload__input-title'
                        >
                            Browse...
                        </label>
                        <input
                            type='file' id='image_uploads' name='image'
                            className='hidden' onChange={e => uploadImageHandler(e)}
                        />
                    </div>
                </div>
                :
                <div className='upload__image__field'>
                    <img
                        className='max-h-52 object-cover rounded-md'
                        src={postImageUrl}
                        alt='uploaded post preview'
                    />
                </div>
            }
        </div>
    );
};

export default UploadPostImageForm;