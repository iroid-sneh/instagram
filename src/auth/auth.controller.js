import authService from "./auth.service";

class authController {
    /**
     * @description: User Signup
     * @param {*} req
     * @param {*} res
     */
    static async signup(req, res) {
        const data = await authService.signup(req, res);
        return data;
    }
}

export default authController;
