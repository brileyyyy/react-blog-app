import React from 'react';
import {useNavigate} from 'react-router-dom'
import {RiFileList2Line} from "react-icons/ri";
import {FcDoughnutChart} from "react-icons/fc";
import {AiOutlineHeart, AiOutlineUser} from "react-icons/ai";
import {BiCategoryAlt} from "react-icons/bi";
import {MdLanguage} from "react-icons/md";
import styles from './menuBar.module.scss'

const MenuBar = () => {
    const navigate = useNavigate()

    return (
        <div className={styles.container}>
            <div className='flex items-center mb-8'>
                <FcDoughnutChart size={30} className='mr-4'/>
                <span className='font-bold'>BlogPost</span>
            </div>
            <div className={styles.nav__list}>
                <div className={styles.nav__item} onClick={() => navigate('/')}>
                    <RiFileList2Line size={20}/>
                    <span>Посты</span>
                </div>
                <div className={styles.nav__item}>
                    <AiOutlineHeart size={20}/>
                    <span>Избранное</span>
                </div>
                <hr className='my-1.5'/>
                <div className={styles.nav__item} onClick={() => navigate('/categories')}>
                    <BiCategoryAlt size={20}/>
                    <span>Категории</span>
                </div>
                <div className={styles.nav__item}>
                    <AiOutlineUser size={20}/>
                    <span>Пользователи</span>
                </div>
                <hr className='my-1.5'/>
                <div className={styles.nav__item}>
                    <MdLanguage size={20} className='text-neutral-400'/>
                    <span>Язык</span>
                </div>
            </div>
        </div>
    );
};

export default MenuBar;