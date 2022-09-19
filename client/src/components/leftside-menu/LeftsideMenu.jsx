import React, {memo} from 'react';
import MenuBar from "../UI/menu-bar/MenuBar";
import TagsBar from "../UI/tags-bar/TagsBar";
import CommentsBar from "../UI/comments-bar/CommentsBar";

const LeftSideMenu = memo(() => {
    return (
        <div>
            <MenuBar/>
            <TagsBar/>
            <CommentsBar/>
        </div>
    );
});

export default LeftSideMenu;