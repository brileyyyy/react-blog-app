import React, {memo} from 'react';
import {BsHash} from "react-icons/bs";
import styles from './tagsBar.module.scss'

const TagsBar = memo(() => {
    return (
        <div className={styles.container}>
            <span className='font-bold'>
                Тэги
            </span>
            <div className={styles.tags__list}>
                <div className={styles.tags__item}>
                    <BsHash size={20}/>
                    <span>React</span>
                </div>
                <div className={styles.tags__item}>
                    <BsHash size={20}/>
                    <span>JS</span>
                </div>
                <div className={styles.tags__item}>
                    <BsHash size={20}/>
                    <span>Product</span>
                </div>
            </div>
        </div>
    );
});

export default TagsBar;