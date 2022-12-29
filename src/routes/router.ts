import userRouter from "./user.routes";
import  express from "express";

const router = express.Router();

// ****** User Routes ******//
router.use("/users", userRouter);

export default router;