import dotenv from "dotenv";
dotenv.config();
import express from "express";
import routes from "./routes/index";
import session from "express-session";
import passport from "passport";
import db from "./models/index";
const app = express();

const PORT = process.env.PORT || 9001;

app.use(
    session({
        secret: "snowman",
        resave: false,
        saveUninitialized: true,
    })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.sequelize
    .sync()
    .then(() => {
        console.log("Database connected successfully.");
    })
    .catch((err) => {
        console.error("Unable to connect to the database:", err);
    });

app.use("/", routes);

app.listen(PORT, () => {
    console.log(`Server is running on port ${process.env.BASE_URL}:${PORT}`);
});
