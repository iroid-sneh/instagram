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

// Relations and Associations
db.user.hasMany(db.post, { foreignKey: "userId", onDelete: "CASCADE" });
db.post.belongsTo(db.user, { foreingKey: "userId" });

export default db;
