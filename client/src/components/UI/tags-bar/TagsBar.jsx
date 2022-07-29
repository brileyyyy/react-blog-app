import React from 'react';
import {BsHash} from "react-icons/bs";

const TagsBar = () => {
    return (
        <div className='mb-4 p-4 bg-white rounded-md'>
            <span className='font-bold'>
                Тэги
            </span>
            <div className='mt-3 text-neutral-500 text-l'>
                <div className='py-1 grid grid-menubar-item items-center rounded-md'>
                    <BsHash size={20}/>
                    <span>React</span>
                </div>
                <div className='py-1 grid grid-menubar-item items-center rounded-md'>
                    <BsHash size={20}/>
                    <span>JS</span>
                </div>
                <div className='py-1 grid grid-menubar-item items-center rounded-md'>
                    <BsHash size={20}/>
                    <span>Product</span>
                </div>
            </div>
        </div>
    );
};

export default TagsBar;