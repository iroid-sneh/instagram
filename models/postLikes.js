module.exports = (sequelize, Sequelize) => {
    const PostLike = sequelize.define("post_like", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
    });
    return PostLike;
};
