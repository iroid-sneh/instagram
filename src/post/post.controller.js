import postService from "./post.service";

class postController {
    /**
     * @description: create post
     * @param {*} req
     * @param {*} res
     */
    static async create(req, res) {
        const data = await postService.create(req, res);
        return data;
    }

    /**
     * @description: feed post
     * @param {*} req
     * @param {*} res
     */
    static async feed(req, res) {
        const data = await postService.feed(req, res);
        return data;
    }
    
    /**
     * @description: likePost
     * @param {*} req
     * @param {*} res
     */
    static async likePost(req, res) {
        const data = await postService.likePost(req, res);
        return data;
    }
}

export default postController;
