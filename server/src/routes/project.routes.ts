import { Router } from "express";
import { 
    getProjectsController,
    getProjectByIdController ,
    createProjectController,
    patchProjectByIdController,
    deleteProjectByIdController
} from "../controllers/project.controller.js";

const router = Router();

router.get("/", getProjectsController);
router.get("/:id", getProjectByIdController);
router.post("/", createProjectController);
router.patch("/:id", patchProjectByIdController);
router.delete("/:id", deleteProjectByIdController);

export default router;