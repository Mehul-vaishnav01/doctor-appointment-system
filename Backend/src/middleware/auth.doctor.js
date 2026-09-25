import jwt from "jsonwebtoken";

async function authDoctor(req, res, next) {
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
        req.docId=decoded.id

        next();

    } catch (error) {
        console.log(error);

        return res.status(401).json({
            message: "Invalid token"
        });
    }
}

export default authDoctor;