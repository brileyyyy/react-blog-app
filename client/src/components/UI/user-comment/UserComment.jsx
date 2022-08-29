import React from 'react';
import {useDispatch} from "react-redux";
import {IoMdClose} from "react-icons/io";
import {deleteComment} from "../../../store/reducers/commentReducer";
import styles from './userComment.module.scss'

const UserComment = ({comment, user}) => {
    const dispatch = useDispatch()

    return (
        <div className='py-3 px-6 flex justify-between hover:bg-gray-50 transition'>
            <div>
                <div className={styles.comment__profile}>
                    <img className={styles.comment__avatar} src='../images/briley.jpg' alt='avatar'/>
                    <div>
                        <div className={styles.comment__name}>{user.name}</div>
                        <div className={styles.comment__date}>{(comment.date).slice(0,10)}</div>
                    </div>
                </div>
                <div className={styles.comment__body}>
                    {comment.text}
                </div>
            </div>
            <div>
                <IoMdClose
                    size={20}
                    className='text-gray-400 cursor-pointer'
                    onClick={() => dispatch(deleteComment(comment))}
                />
            </div>
        </div>
    );
};

export default UserComment;