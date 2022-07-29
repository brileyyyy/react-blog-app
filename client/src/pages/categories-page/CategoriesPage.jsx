import React from 'react';
import LeftSideMenu from "../../components/leftside-menu/LeftsideMenu";
import Navbar from "../../components/UI/navbar/Navbar";
import CategoryList from "../../components/category-list/CategoryList";
import CreateButton from "../../components/UI/button/CreateButton";

const CategoriesPage = () => {
    return (
        <div className='grid grid-primary gap-6'>
            <LeftSideMenu/>
            <div>
                <Navbar/>
                <div className='mt-6 text-l font-medium mr-6'>
                    <CreateButton/>
                </div>
                <CategoryList/>
            </div>
        </div>
    );
};

export default CategoriesPage;