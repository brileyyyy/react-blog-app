import React from 'react';
import styles from './userComment.module.scss'

const UserComment = ({comment, user}) => {
    return (
        <div className='mb-8'>
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
    );
};

export default UserComment;