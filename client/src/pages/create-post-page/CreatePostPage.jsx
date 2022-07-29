import React, {useState} from 'react';
import PostButton from "../../components/UI/button/PostButton";
import CancelButton from "../../components/UI/button/CancelButton";
import {TbLetterB, TbLetterH} from "react-icons/tb";
import {AiOutlineItalic, AiOutlineLine} from "react-icons/ai";
import {FaListOl, FaListUl, FaQuoteLeft} from "react-icons/fa";
import {ImPageBreak} from "react-icons/im";
import {BsImage} from "react-icons/bs";
import {BiMove} from "react-icons/bi";
import {GoEye} from "react-icons/go";

const CreatePostPage = () => {
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')

    return (
        <div className='mx-auto my-8 max-w-4xl'>
            <div className='bg-white p-10 rounded-md'>
                <div className='py-20 flex flex-col justify-center items-center border border-gray-200 rounded-md'>
                    <span className='mb-4 text-md text-gray-500 font-medium'>
                        Загрузите картинку
                    </span>
                    <div className='flex items-center text-medium text-sm'>
                        <label
                            htmlFor='image_uploads'
                            className='btn-primary text-sm px-4 text-white bg-blue-500 rounded-md cursor-pointer'
                        >
                            Browse...
                        </label>
                        <input
                            type='file'
                            id='image_uploads'
                            className='hidden'
                        />
                    </div>
                </div>
            </div>
            <div className='my-5 px-6 flex items-center text-gray-700'>
                <TbLetterB size={20} className='mr-3'/>
                <AiOutlineItalic size={20} className='mr-3'/>
                <TbLetterH size={20}/>
                <AiOutlineLine size={20} className='mx-1.5 text-gray-400' style={{transform: 'rotate(90deg)'}}/>
                <FaQuoteLeft size={20} className='mr-6 ml-1'/>
                <FaListUl size={20} className='mr-6'/>
                <FaListOl size={20}/>
                <AiOutlineLine size={20} className='mx-3 text-gray-400' style={{transform: 'rotate(90deg)'}}/>
                <ImPageBreak size={20} className='mr-5'/>
                <BsImage size={20}/>
                <AiOutlineLine size={20} className='ml-3 mr-2 text-gray-400' style={{transform: 'rotate(90deg)'}}/>
                <BiMove size={20} className='mr-4'/>
                <GoEye size={20}/>
            </div>
            <div className='bg-white px-10 py-7 rounded-md'>
                <input
                    className='w-full mb-6 text-3xl text-gray-700 font-bold outline-none placeholder:text-gray-300'
                    type="text"
                    value={title}
                    placeholder='Заголовок статьи...'
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    className="w-full min-h-300 mb-4 text-base text-gray-600 resize-none outline-none placeholder:text-gray-300"
                    value={description}
                    placeholder="Введите текст..."
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input
                    className='w-full mb-6 text-xl text-gray-400 font-medium outline-none border-b-2 placeholder:text-gray-300'
                    type="text"
                    placeholder='Тэги'
                />
                <div className='flex items-center'>
                    <PostButton data={{title, description}}/>
                    <CancelButton/>
                </div>
            </div>

        </div>
    );
};

export default CreatePostPage;