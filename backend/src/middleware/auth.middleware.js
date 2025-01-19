import { clerkClient } from "@clerk/express";

export const protectRoute = async (req, res, next) => {
    try {
        if (!req.auth || !req.auth.userId) {
            return res.status(401).json({ message: "Unauthorized - you must be logged in" });
        }
        next();
    } catch (error) {
        console.error("Error in protectRoute middleware:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const requireAdmin = async (req, res, next) => {
    try {
        if (!req.auth || !req.auth.userId) {
            return res.status(401).json({ message: "Unauthorized - you must be logged in" });
        }

        const currentUser = await clerkClient.users.getUser(req.auth.userId);
        const isAdmin = process.env.ADMIN_EMAIL === currentUser.primaryEmailAddress?.emailAddress;

        if (!isAdmin) {
            return res.status(403).json({ message: "Unauthorized - you must be an admin" });
        }

        next();
    } catch (error) {
        console.error("Error in requireAdmin middleware:", error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
