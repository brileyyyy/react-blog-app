import React from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from 'react-router-dom'
import {RiFileList2Line} from "react-icons/ri";
import {FcDoughnutChart} from "react-icons/fc";
import {AiOutlineHeart, AiOutlineUser} from "react-icons/ai";
import {BiCategoryAlt} from "react-icons/bi";
import {MdLanguage} from "react-icons/md";
import {setLanguagePopupDisplay} from "../../../store/reducers/popupReducer";
import styles from './menuBar.module.scss'

const MenuBar = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {languagePopupDisplay} = useSelector(state => state.popup)

    const setPopupDisplayHandler = () => {
        const display = (languagePopupDisplay === 'none') ? 'block' : 'none'
        dispatch(setLanguagePopupDisplay(display))
    }

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
                <div className={styles.nav__item} onClick={() => navigate('/liked')}>
                    <AiOutlineHeart size={20}/>
                    <span>Избранное</span>
                </div>
                <hr className='my-1.5'/>
                <div className={styles.nav__item} onClick={() => navigate('/categories')}>
                    <BiCategoryAlt size={20}/>
                    <span>Категории</span>
                </div>
                <div className={styles.nav__item} onClick={() => navigate('/users')}>
                    <AiOutlineUser size={20}/>
                    <span>Пользователи</span>
                </div>
                <hr className='my-1.5'/>
                <div
                    className='py-2 grid grid-menubar-item items-center cursor-pointer'
                    onClick={() => setPopupDisplayHandler()}
                >
                    <MdLanguage size={20} className='text-gray-400'/>
                    <span>Язык</span>
                </div>
            </div>
        </div>
    );
};

export default MenuBar;