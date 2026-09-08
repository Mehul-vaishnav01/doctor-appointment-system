import jwt from "jsonwebtoken";

async function authUser(req, res, next) {
    try {
        const token = req.cookies.token;

        if (!token) {
            return res.status(401).json({
                message: "Token not found"
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );
        req.userId=decoded.id

        next();

    } catch (error) {
        console.log(error);

        return res.status(401).json({
            message: "Invalid token"
        });
    }
}

export default authUser;