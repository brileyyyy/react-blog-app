import React, {useState} from 'react';
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom";
import {updateOnePost} from "../../store/actions/postActions";
import Button from "../../components/UI/button/Button";
import UploadPostImageFormOnEdit from "../../components/UI/upload-image-form/UploadPostImageFormOnEdit";
import {setPostImageToDefault} from "../../store/reducers/postReducer";
import {Editor} from "react-draft-wysiwyg";
import {convertToRaw, EditorState} from "draft-js";
import draftToHtml from "draftjs-to-html";
import htmlToDraft from "html-to-draftjs";
import ContentState from "draft-js/lib/ContentState";

const EditPostPage = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const post = useSelector(state => state.post.currentPost)
    const {postImageUrl} = useSelector(state => state.post)
    const [title, setTitle] = useState(post.title)
    const [description, setDescription] = useState(post.description)
    const [tags, setTags] = useState(post.tags.toString().replaceAll(',', ' '))
    const contentBlock = htmlToDraft(post.description);
    const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
    const [editorState, setEditorState] = useState(EditorState.createWithContent(contentState))

    function updatePostHandler() {
        const data = {title, description, tags: tags.split(' '), imageUrl: postImageUrl ? postImageUrl : post.imageUrl}
        navigate('/')
        dispatch(updateOnePost({post, ...data}))
        dispatch(setPostImageToDefault())
    }

    return (
        <div className='wrapper'>
            <UploadPostImageFormOnEdit post={post}/>
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
                        onClick={() => updatePostHandler()}
                    >
                        Сохранить
                    </Button>
                    <div className='post__cancel' onClick={() => navigate('/')}>
                        Отмена
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EditPostPage;