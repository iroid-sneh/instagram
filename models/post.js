module.exports = (sequelize, Sequelize) => {
    const Post = sequelize.define("post", {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true,
        },
        title: {
            type: Sequelize.STRING,
            allowNull: false,
        },
        content: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        imageUrl: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
    });
    return Post;
};
