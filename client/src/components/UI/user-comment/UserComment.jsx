import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {IoMdClose} from "react-icons/io";
import {MdOutlineModeEdit} from "react-icons/md"
import {BsCheck2} from "react-icons/bs";
import {deleteComment, updateComment} from "../../../store/reducers/commentReducer";
import styles from './userComment.module.scss'

const UserComment = ({comment}) => {
    const dispatch = useDispatch()
    const {currentUser} = useSelector(state => state.user)
    const [edit, setEdit] = useState(false)
    const [newText, setNewText] = useState(comment.text)

    function confirmEditHandler() {
        setEdit(false)
        dispatch(updateComment({comment, newText}))
    }

    return (
        <div className='py-3'>
            <div className='px-6 flex justify-between'>
                <div className={styles.comment__profile}>
                    <img
                        className={styles.comment__avatar}
                        src={comment.avatar}
                        alt='avatar'
                    />
                    <div>
                        <div className={styles.comment__name}>{comment.author}</div>
                        <div className={styles.comment__date}>{(comment.createdAt).slice(0,10)}</div>
                    </div>
                </div>
                {currentUser.name === comment.author
                    ?
                    (!edit
                        ?
                        <div className='flex'>
                            <MdOutlineModeEdit
                                size={20}
                                className='text-gray-400 cursor-pointer'
                                onClick={() => setEdit(true)}
                            />
                            <IoMdClose
                                size={20}
                                className='text-gray-400 cursor-pointer ml-3'
                                onClick={() => dispatch(deleteComment(comment))}
                            />
                        </div>
                        :
                        <BsCheck2
                            size={22}
                            className='text-gray-400 cursor-pointer'
                            onClick={() => confirmEditHandler()}
                        />)
                    :
                    ''
                }
            </div>
            <div className='px-6 ml-16'>
                {currentUser.name === comment.author
                    ?
                    !edit
                        ?
                        <div className={styles.comment__body}>
                            {comment.text}
                        </div>
                        :
                        <textarea
                            value={newText}
                            className={styles.comment__edit__body}
                            onChange={e => setNewText(e.target.value)}
                        />
                    :
                    <div className={styles.comment__body}>
                        {comment.text}
                    </div>
                }

            </div>
        </div>
    );
};

export default UserComment;