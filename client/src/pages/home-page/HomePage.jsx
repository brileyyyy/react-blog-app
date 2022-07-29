import React from 'react';
import PostList from "../../components/post-list/PostList";
import Navbar from "../../components/UI/navbar/Navbar";
import LeftSideMenu from "../../components/leftside-menu/LeftsideMenu";
import CreateButton from "../../components/UI/button/CreateButton";
import CategoryButton from "../../components/UI/button/CategoryButton";

const HomePage = () => {
    const isAuth = true

    return (
        <div className='grid grid-primary gap-6'>
            <LeftSideMenu/>
            <div>
                <Navbar/>
                {isAuth
                    ?
                    <div className='mt-6 flex items-center text-l font-medium mr-6'>
                        <CreateButton/>
                        <CategoryButton/>
                    </div>
                    :
                    ''
                }
                <PostList/>
            </div>
        </div>
    );
};

export default HomePage;