import { Router } from "express";
import { 
    getTasksByProjectController,
    createTaskController 
} from "../controllers/task.controller.js";

const router = Router();

router.get("/:projectId/tasks", getTasksByProjectController);
router.post("/:projectId/tasks", createTaskController);

export default router;