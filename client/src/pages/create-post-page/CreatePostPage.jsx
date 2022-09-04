import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import {TbLetterB, TbLetterH} from "react-icons/tb";
import {AiOutlineItalic, AiOutlineLine} from "react-icons/ai";
import {FaListOl, FaListUl, FaQuoteLeft} from "react-icons/fa";
import {ImPageBreak} from "react-icons/im";
import {BsImage} from "react-icons/bs";
import {BiMove} from "react-icons/bi";
import {GoEye} from "react-icons/go";
import Button from "../../components/UI/button/Button";
import {createPost} from "../../store/reducers/postReducer";
import UploadPostImageForm from "../../components/UI/upload-image-form/UploadPostImageForm";
import {setPostImageToDefault} from "../../store/reducers/postReducer";
import {DEFAULT_IMAGE_URL} from "../../config/url";
import './createPostPage.scss'

const CreatePostPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {currentUser} = useSelector(state => state.user)
    let {postImageUrl} = useSelector(state => state.post)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [tags, setTags] = useState('')

    function createPostHandler() {
        navigate('/')
        if (!postImageUrl) {
            postImageUrl = DEFAULT_IMAGE_URL
        }
        dispatch(createPost(
            {author: currentUser.name, title, description, tags: tags.split(' '),
                imageUrl: postImageUrl}
        ))
        dispatch(setPostImageToDefault())
    }

    return (
        <div className='wrapper'>
            <UploadPostImageForm/>
            <div className='edit__icons'>
                <TbLetterB size={20} className='mr-3'/>
                <AiOutlineItalic size={20} className='mr-3'/>
                <TbLetterH size={20}/>
                <AiOutlineLine
                    size={20} className='mx-1.5 text-gray-400'
                    style={{transform: 'rotate(90deg)'}}
                />
                <FaQuoteLeft size={20} className='mr-6 ml-1'/>
                <FaListUl size={20} className='mr-6'/>
                <FaListOl size={20}/>
                <AiOutlineLine
                    size={20} className='mx-3 text-gray-400'
                    style={{transform: 'rotate(90deg)'}}
                />
                <ImPageBreak size={20} className='mr-5'/>
                <BsImage size={20}/>
                <AiOutlineLine
                    size={20} className='ml-3 mr-2 text-gray-400'
                    style={{transform: 'rotate(90deg)'}}
                />
                <BiMove size={20} className='mr-4'/>
                <GoEye size={20}/>
            </div>
            <div className='bg-white px-10 py-9 rounded-md'>
                <input
                    className='post__title'
                    type='text'
                    value={title}
                    placeholder='Заголовок статьи...'
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    className='post__description'
                    value={description}
                    placeholder="Введите текст..."
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    className='post__tags'
                    type='text'
                    value={tags}
                    placeholder='Тэги'
                    onChange={(e) => setTags(e.target.value)}
                />
                <div className='flex items-center'>
                    <Button
                        className='post__btn'
                        onClick={() => createPostHandler()}
                    >
                        Опубликовать
                    </Button>
                    <div className='post__cancel' onClick={() => navigate('/')}>
                        Отмена
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePostPage;