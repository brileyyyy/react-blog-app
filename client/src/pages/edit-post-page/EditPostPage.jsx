import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {updateOnePost} from "../../store/reducers/postReducer";
import {TbLetterB, TbLetterH} from "react-icons/tb";
import {AiOutlineItalic, AiOutlineLine} from "react-icons/ai";
import {FaListOl, FaListUl, FaQuoteLeft} from "react-icons/fa";
import {ImPageBreak} from "react-icons/im";
import {BsImage} from "react-icons/bs";
import {BiMove} from "react-icons/bi";
import {GoEye} from "react-icons/go";
import Button from "../../components/UI/button/Button";
import UploadPostImageFormOnEdit from "../../components/UI/upload-image-form/UploadPostImageFormOnEdit";
import {setPostImageToDefault} from "../../store/reducers/postReducer";

const EditPostPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const post = useSelector(state => state.post.currentPost)
    const {postImageUrl} = useSelector(state => state.post)
    const [title, setTitle] = useState(post.title)
    const [description, setDescription] = useState(post.description)
    const [tags, setTags] = useState(post.tags)

    function updatePostHandler() {
        const data = {title, description, tags: tags.split(' '), imageUrl: postImageUrl}
        navigate('/')
        dispatch(updateOnePost({post, ...data}))
        dispatch(setPostImageToDefault())
    }

    return (
        <div className='wrapper'>
            <UploadPostImageFormOnEdit post={post}/>
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
                        onClick={() => updatePostHandler()}
                    >
                        Сохранить
                    </Button>
                    <div className='post__cancel' onClick={() => navigate('/')}>
                        Отмена
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditPostPage;