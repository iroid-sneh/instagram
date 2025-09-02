import db from "../../models/index";
const User = db.user;
const Post = db.post;
class postService {
    /**
     * @description: create post
     * @param {*} req
     * @param {*} res
     */
    static async create(req, res) {
        try {
            const { title, content, imageUrl } = req.body;
            const userId = req.user.id;

            const findUser = await User.findByPk(userId);
            if (!findUser)
                return res.status(401).json({ message: "User not found." });

            const post = await Post.create({
                title,
                content,
                imageUrl,
                userId: userId,
            });

            return res.status(200).json({ success: true, post });
        } catch (error) {
            console.log("Error: ", error);
            return res.status(500).json({ message: "Internal Server Error." });
        }
    }

    /**
     * @description: feed post
     * @param {*} req
     * @param {*} res
     */
    static async feed(req, res) {
        try {
            const posts = await Post.findAll({
                include: {
                    model: User,
                    attributes: ["userName", "email"],
                },
                order: [["createdAt", "DESC"]],
            });

            return res.status(200).json({ success: true, posts });
        } catch (error) {
            console.log("Error: ", error);
            return res.status(500).json({ message: "Internal Server Error." });
        }
    }

    /**
     * @description: likePost
     * @param {*} req
     * @param {*} res
     */
    static async likePost(req, res) {
        try {
            const userId = req.user.id;
            const { postId } = req.body;

            const findPost = await Post.findByPk(postId);
            if (!findPost)
                return res.status(404).json({ message: "Post not found" });

            await findPost.addLikedByUsers(userId);

            return res
                .status(200)
                .json({ success: true, message: "Post liked successfully" });
        } catch (error) {
            console.log("Error: ", error);
            return res.status(500).json({ message: "Internal Server Error." });
        }
    }
}

export default postService;
