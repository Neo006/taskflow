import { Router } from "express";
import { 
    getTaskByIdController,
    patchTaskByIdController,
    deleteTaskByIdController
 } from "../controllers/task.controller.js";

const router = Router();

router.get("/:taskId", getTaskByIdController);
router.patch("/:taskId", patchTaskByIdController);
router.delete("/:taskId", deleteTaskByIdController);

export default router;