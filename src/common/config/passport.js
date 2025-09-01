import passport from "passport";
import { ExtractJwt, Strategy as JwtStrategy } from "passport-jwt";
import User from "../../../models/user";
import dotenv from "dotenv";
dotenv.config();

const opts = {
    jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    secretOrKey: process.env.JWT_SECRET,
};

passport.use(
    new JwtStrategy(opts, async (payload, done) => {
        try {
            const user = await User.findByPk(payload.id);
            if (!user) return done(null, false);
            return done(null, user);
        } catch (error) {
            console.error("Error in JWT Strategy:", error);
            return done(error, false);
        }
    })
);
