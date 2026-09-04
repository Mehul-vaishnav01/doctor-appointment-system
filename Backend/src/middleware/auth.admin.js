import jwt from "jsonwebtoken";

async function authAdmin(req, res, next) {
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
        if (decoded.email !== process.env.ADMIN_EMAIL) {
            return res.status(401).json({
                message: "Token is Invalid"
            });
        }

        next();

    } catch (error) {
        console.log(error);

        return res.status(401).json({
            message: "Invalid token"
        });
    }
}

export default authAdmin;