import React, {memo, useEffect} from 'react';
import {BsHash} from "react-icons/bs";
import {useDispatch, useSelector} from "react-redux";
import {getPopularTags} from "../../../store/actions/tagActions";
import styles from './tagsBar.module.scss'

const TagsBar = memo(() => {
    const dispatch = useDispatch()
    const {popularTags} = useSelector(state => state.tag)
    const {posts} = useSelector(state => state.post)

    useEffect(() => {
        dispatch(getPopularTags())
    }, [dispatch, posts])

    return (
        <div className={styles.container}>
            <span className='font-bold'>
                Тренды
            </span>
            {popularTags.length
                ?
                <div className={styles.tags__list}>
                    {(popularTags.slice(0,5)).map(tag =>
                        <div className={styles.tags__item} key={tag[0]}>
                            <BsHash size={20}/>
                            <span>{tag[0]}</span>
                        </div>
                    )}
                </div>
                :
                <div className={styles.no__tags}>
                    Тут появятся популярные тэги
                </div>
            }
        </div>
    );
});

export default TagsBar;