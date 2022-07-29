import React from 'react';
import styles from './userComment.module.scss'

const UserComment = () => {
    return (
        <div className='mt-6'>
            <div className={styles.comment__profile}>
                <img className={styles.comment__avatar} src='images/briley.jpg' alt='avatar'/>
                <div>
                    <div className={styles.comment__name}>User</div>
                    <div className={styles.comment__date}>10:02, Jun 23 2022</div>
                </div>
            </div>
            <div className={styles.comment__body}>
                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Animi, unde.
            </div>
        </div>
    );
};

export default UserComment;