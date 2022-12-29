import userRouter from "./user.routes";
import authRoutes from "./authentication.routes";
import  express from "express";

const router = express.Router();

// ****** User Routes ******//
router.use("/users", userRouter);

// ****** Authentication Routes ******//
router.use("/authentication", authRoutes);

export default router;