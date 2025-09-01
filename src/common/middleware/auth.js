import passport from "../config/passport";

export default (req, res, next) => {
    passport.authenticate(
        "jwt",
        { session: false },
        async (err, user, info) => {
            if (err) {
                console.error("Authentication error:", err);
                return res
                    .status(500)
                    .json({ message: "Authentication Error" });
            }

            if (!user) {
                let message = "Unauthorized";

                if (info?.name === "TokenExpiredError") {
                    message = "Token Expired";
                }

                return res.status(401).json({ success: false, message });
            }

            try {
                req.user = user;
                next();
            } catch (error) {
                console.error("Error in auth middleware:", error);
                return res
                    .status(500)
                    .json({ success: false, message: "Internal Server Error" });
            }
        }
    )(req, res, next);
};
