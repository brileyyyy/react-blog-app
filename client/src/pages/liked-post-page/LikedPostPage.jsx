import React from 'react';
import {useNavigate} from "react-router-dom";
import LeftSideMenu from "../../components/leftside-menu/LeftsideMenu";
import Navbar from "../../components/UI/navbar/Navbar";
import Button from "../../components/UI/button/Button";
import {BiCategoryAlt} from "react-icons/bi";
import LikedPostList from "../../components/liked-post-list/LikedPostList";

const LikedPostPage = () => {
    const navigate = useNavigate()

    return (
        <div className='mx-auto max-w-7xl grid grid-primary gap-6'>
            <LeftSideMenu/>
            <div>
                <Navbar/>
                <div className='mt-6 mr-6 flex items-center text-l'>
                    <Button
                        className='ml-auto mr-6 btn-primary bg-yellow-300'
                        onClick={() => navigate('/create')}
                    >
                        Создать пост
                    </Button>
                    <Button
                        className='btn-primary bg-lime-300'
                        onClick={() => navigate('/categories')}
                    >
                        <BiCategoryAlt size={20} className='mr-2'/>
                        Категории
                    </Button>
                </div>
                <LikedPostList/>
            </div>
        </div>
    );
};

export default LikedPostPage;