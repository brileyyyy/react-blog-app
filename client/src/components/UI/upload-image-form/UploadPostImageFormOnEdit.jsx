import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {uploadPostImage} from "../../../store/actions/postActions";
import {DEFAULT_IMAGE_URL} from "../../../config/url";
import {MdFileUpload} from "react-icons/md";
import './uploadPostImageForm.scss'

const UploadPostImageFormOnEdit = ({post}) => {
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
            {!postImageUrl && post.imageUrl === DEFAULT_IMAGE_URL
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
                <div className='upload__image__field__edit'>
                    <img
                        className='upload__image'
                        src={postImageUrl ? postImageUrl : post.imageUrl}
                        alt='uploaded post preview'
                    />
                    <label
                        htmlFor='bg_image_uploads'
                        className='upload__icon'
                    >
                        <MdFileUpload size={42}/>
                    </label>
                    <input
                        type='file' id='bg_image_uploads' name='image'
                        className='hidden' onChange={e => uploadImageHandler(e)}
                    />
                </div>
            }
        </div>
    );
};

export default UploadPostImageFormOnEdit;