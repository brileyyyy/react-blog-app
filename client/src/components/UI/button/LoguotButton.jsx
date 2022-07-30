import React from 'react';
import {useDispatch} from "react-redux";
import {logout} from "../../../store/reducers/userReducer";

const LoguotButton = () => {
    const dispatch = useDispatch()

    return (
        <button
            className='cancel__btn'
            onClick={() => dispatch(logout())}
        >
            Выйти
        </button>
    );
};

export default LoguotButton;