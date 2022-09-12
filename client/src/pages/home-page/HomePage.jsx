import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import PostList from "../../components/post-list/PostList";
import Navbar from "../../components/UI/navbar/Navbar";
import LeftSideMenu from "../../components/leftside-menu/LeftsideMenu";
import Button from "../../components/UI/button/Button";
import {useDispatch, useSelector} from "react-redux";
import {BiCategoryAlt} from "react-icons/bi";
import {getAllPosts} from "../../store/actions/postActions";
import './homePage.scss'

const HomePage = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {isAuth} = useSelector(state => state.user)
    const [searchName, setSearchName] = useState('')
    const [searchTimeout, setSearchTimeout] = useState(false)

    function searchPostsHandler(e) {
        setSearchName(e.target.value)
        if (searchTimeout !== false) {
            clearTimeout(searchTimeout)
        }
        if (e.target.value !== '') {
            setSearchTimeout(setTimeout((value) => {
                dispatch(getAllPosts({sortValue: value}))
            }, 500, e.target.value))
        } else {
            dispatch(getAllPosts({sortType: 'all'}))
        }
    }

    return (
        <div className='home__wrapper'>
            <LeftSideMenu/>
            <div>
                <Navbar/>
                {isAuth
                    ?
                    <div className='post__functions'>
                        <input
                            className='search__field'
                            value={searchName}
                            type="text"
                            placeholder='Введите название поста или тэг...'
                            onChange={e => searchPostsHandler(e)}
                        />
                        <Button
                            className='create__post__btn'
                            onClick={() => navigate('/create')}
                        >
                            Создать пост
                        </Button>
                        <Button
                            className='categories__btn'
                            onClick={() => navigate('/categories')}
                        >
                            <BiCategoryAlt size={20} className='mr-2'/>
                            Категории
                        </Button>
                    </div>
                    :
                    ''
                }
                <PostList/>
            </div>
        </div>
    );
};

export default HomePage;