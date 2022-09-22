import Post from "../models/Post.js";

class TagController {
    async getPopularTags(req, res) {
        try {
            const tagsArray = []
            const postTags = await Post.find({}, {tags: 1, _id: 0})

            for (let el of postTags) {
                tagsArray.push(...el.tags)
            }

            const statObj = {}
            tagsArray.forEach(el => {
                el = el.substring(1)
                if (el in statObj) statObj[el]++
                else statObj[el] = 1
            })

            const sortable = []
            for (let tagElem in statObj) {
                sortable.push([tagElem, statObj[tagElem]])
            }

            sortable.sort((a, b) => b[1] - a[1])

            return res.json(sortable)
        } catch (e) {
            console.log(e)
            return res.status(500).json({message: 'Get popular tags error'})
        }
    }
}

export default new TagController()