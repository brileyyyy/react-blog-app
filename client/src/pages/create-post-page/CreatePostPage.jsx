import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import {useDispatch, useSelector} from "react-redux";
import Button from "../../components/UI/button/Button";
import {createPost} from "../../store/actions/postActions";
import UploadPostImageForm from "../../components/UI/upload-image-form/UploadPostImageForm";
import {setPostImageToDefault} from "../../store/reducers/postReducer";
import {DEFAULT_IMAGE_URL} from "../../config/url";
import {EditorState, convertToRaw} from 'draft-js'
import {Editor} from 'react-draft-wysiwyg'
import draftToHtml from 'draftjs-to-html'
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css'
import './createPostPage.scss'

const CreatePostPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const {currentUser} = useSelector(state => state.user)
    let {postImageUrl} = useSelector(state => state.post)
    const [title, setTitle] = useState('')
    const [description, setDescription] = useState('')
    const [tags, setTags] = useState('')
    const [editorState, setEditorState] = useState(EditorState.createEmpty())

    function createPostHandler() {
        navigate('/')
        if (!postImageUrl) {
            postImageUrl = DEFAULT_IMAGE_URL
        }
        dispatch(createPost(
            {author: currentUser.name, title, description, tags: tags.split(' '),
                imageUrl: postImageUrl}
        ))
        dispatch(setPostImageToDefault())
    }

    return (
        <div className='wrapper'>
            <UploadPostImageForm/>
            <div className='mt-4 bg-white px-10 py-9 rounded-md'>
                <input
                    className='post__title'
                    type='text'
                    value={title}
                    placeholder='Заголовок статьи...'
                    onChange={(e) => setTitle(e.target.value)}
                />
                <Editor
                    placeholder='Введите текст...'
                    editorState={editorState}
                    onEditorStateChange={newState => {
                        setEditorState(newState)
                        setDescription(draftToHtml(convertToRaw(newState.getCurrentContent())))
                    }}
                    toolbar={{
                        options: ['inline', 'blockType', 'fontSize', 'list', 'emoji'],
                        inline: {
                            inDropdown: false,
                            className: undefined,
                            component: undefined,
                            dropdownClassName: undefined,
                            options: ['bold', 'italic', 'underline', 'strikethrough', 'monospace', 'superscript', 'subscript'],
                        },
                        blockType: {
                            inDropdown: true,
                            options: ['Normal', 'H1', 'H2', 'H3', 'H4', 'H5', 'H6', 'Blockquote', 'Code'],
                            className: undefined,
                            component: undefined,
                            dropdownClassName: undefined,
                        },
                        fontSize: {
                            options: [8, 9, 10, 11, 12, 14, 16, 18, 24, 30, 36, 48, 60, 72, 96],
                            className: undefined,
                            component: undefined,
                            dropdownClassName: undefined,
                        },
                        fontFamily: {
                            options: ['Arial', 'Georgia', 'Impact', 'Tahoma', 'Times New Roman', 'Verdana'],
                            className: undefined,
                            component: undefined,
                            dropdownClassName: undefined,
                        },
                        list: {
                            inDropdown: false,
                            className: undefined,
                            component: undefined,
                            dropdownClassName: undefined,
                            options: ['unordered', 'ordered', 'indent', 'outdent'],
                        },
                        emoji: {
                            className: undefined,
                            component: undefined,
                            popupClassName: undefined,
                            emojis: [
                                '😀', '😁', '😂', '😃', '😉', '😋', '😎', '😍', '😗', '🤗', '🤔', '😣', '😫', '😴', '😌', '🤓',
                                '😛', '😜', '😠', '😇', '😷', '😈', '👻', '😺', '😸', '😹', '😻', '😼', '😽', '🙀', '🙈',
                                '🙉', '🙊', '👼', '👮', '🕵', '💂', '👳', '🎅', '👸', '👰', '👲', '🙍', '🙇', '🚶', '🏃', '💃',
                                '⛷', '🏂', '🏌', '🏄', '🚣', '🏊', '⛹', '🏋', '🚴', '👫', '💪', '👈', '👉', '👉', '👆', '🖕',
                                '👇', '🖖', '🤘', '🖐', '👌', '👍', '👎', '✊', '👊', '👏', '🙌', '🙏', '🐵', '🐶', '🐇', '🐥',
                                '🐸', '🐌', '🐛', '🐜', '🐝', '🍉', '🍄', '🍔', '🍤', '🍨', '🍪', '🎂', '🍰', '🍾', '🍷', '🍸',
                                '🍺', '🌍', '🚑', '⏰', '🌙', '🌝', '🌞', '⭐', '🌟', '🌠', '🌨', '🌩', '⛄', '🔥', '🎄', '🎈',
                                '🎉', '🎊', '🎁', '🎗', '🏀', '🏈', '🎲', '🔇', '🔈', '📣', '🔔', '🎵', '🎷', '💰', '🖊', '📅',
                                '✅', '❎', '💯',
                            ],
                        }
                    }}
                />
                <input
                    className='post__tags'
                    type='text'
                    value={tags}
                    placeholder='Тэги'
                    onChange={(e) => setTags(e.target.value)}
                />
                <div className='flex items-center'>
                    <Button
                        className='post__btn'
                        onClick={() => createPostHandler()}
                    >
                        Опубликовать
                    </Button>
                    <div className='post__cancel' onClick={() => navigate('/')}>
                        Отмена
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CreatePostPage;