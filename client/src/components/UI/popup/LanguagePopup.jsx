import React, {useState} from 'react'
import {useDispatch, useSelector} from "react-redux";
import {setLanguagePopupDisplay} from "../../../store/reducers/popupReducer";
import {BsCheck2} from "react-icons/bs";
import Overlay from "../overlay/Overlay";
import './popup.scss'

const LanguagePopup = () => {
    const dispatch = useDispatch()
    const {languagePopupDisplay} = useSelector(state => state.popup)
    const [language, setLanguage] = useState('russian')

    const changeLanguageHandler = () => {
        setLanguage(language === 'russian' ? 'english' : 'russian')
    }

    return (
        <div
            style={{display: languagePopupDisplay}}
            onClick={() => dispatch(setLanguagePopupDisplay('none'))}
        >
            <Overlay/>
            <div
                className='absolute top-72 left-40 py-2 w-44 bg-white rounded-md shadow-2xl'
            >
                <div
                    className='profile__popup__item'
                    onClick={() => changeLanguageHandler()}
                >
                    {language === 'russian'
                        ? <BsCheck2 size={22} className='text-gray-400'/>
                        : <div></div>
                    }
                    Русский
                </div>
                <div
                    className='profile__popup__item'
                    onClick={() => changeLanguageHandler()}
                >
                    {language !== 'russian'
                        ? <BsCheck2 size={22} className='text-gray-400'/>
                        : <div></div>
                    }
                    Английский
                </div>
            </div>
        </div>
    );
};

export default LanguagePopup;