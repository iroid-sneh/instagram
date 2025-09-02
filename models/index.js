import dbConfig from "../src/common/config/db.config";
import Sequelize from "sequelize";

const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: "0",
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
    logging: false,
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

// Models
db.user = require("./user")(sequelize, Sequelize);
db.post = require("./post")(sequelize, Sequelize);
db.postLike = require("./postLikes")(sequelize, Sequelize);

// Relations and Associations
db.user.hasMany(db.post, { foreignKey: "userId", onDelete: "CASCADE" });
db.post.belongsTo(db.user, { foreignKey: "userId", onDelete: "CASCADE" });

// Post and Likes associations
db.user.belongsToMany(db.post, {
    through: db.postLike,
    as: "likedPosts",
    foreignKey: "userId",
    otherKey: "postId",
    onDelete: "CASCADE",
});
db.post.belongsToMany(db.user, {
    through: db.postLike,
    as: "likedByUsers",
    foreignKey: "postId",
    otherKey: "userId",
    onDelete: "CASCADE",
});

export default db;
