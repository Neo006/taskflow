import type { Request, Response } from "express";
import { 
    getTasksByProject,
    getTask,
    createTaskService,
    patchTaskByIdService,
    deleteTaskByIdService
} from "../services/task.service.js";

export const getTasksByProjectController = async (req: Request, res: Response) => {
    try {
        const projectId = Number(req.params.projectId);

        if (!Number.isInteger(projectId) || projectId <= 0) {
            res.status(400).json({
                message: "Invalid Project ID"
            });
            return;
        }

        const tasks = await getTasksByProject(projectId);

        if(tasks === null) {
            res.status(404).json({
                message: "Project Not Found"
            });
            return;
        }
        
        res.status(200).json(tasks);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

export const getTaskByIdController = async (req: Request, res: Response) => {
    try {
        const taskId = Number(req.params.taskId);

        if (!Number.isInteger(taskId) || taskId <= 0) {
            res.status(400).json({
                message: "Invalid Task ID"
            });
            return;
        }

        const task = await getTask(taskId);
        
        if (task === null) {
            res.status(404).json({
                message: "Task Not Found"
            });
            return;
        }

        res.status(200).json(task);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

export const createTaskController = async (req: Request, res: Response) => {
    try {
        const projectId = Number(req.params.projectId);
        
        if (!Number.isInteger(projectId) || projectId <= 0) {
            res.status(400).json({
                message: "Invalid Project ID"
            });
            return;
        }

        const {title, description, status, priority, dueDate} = req.body;

        if (typeof title !== "string" || !title.trim() || title.trim().length > 200) {
            res.status(400).json({
                message: "Title must be between 1 and 200 characters"
            });
            return;
        }
        
        const task = await createTaskService(projectId, title, description, status, priority, dueDate);

        if (task === null) {
            res.status(404).json({
                message: "Project Not Found"
            });
            return;
        }

        res.status(201).json(task);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

export const patchTaskByIdController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.taskId);

          if (!Number.isInteger(id) || id <= 0) {
            res.status(400).json({ message: "Invalid Task ID" });
            return;
        }

        const task = await patchTaskByIdService(id, req.body);

        if (task === null) {
            res.status(404).json({ message: "Task Not Found" });
            return;
        }

        res.status(200).json(task);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const deleteTaskByIdController = async (req: Request, res: Response) => {
    try {
        const taskId = Number(req.params.taskId);

        if (!Number.isInteger(taskId) || taskId <= 0) {
            res.status(400).json({ message: "Invalid Task ID" });
            return;
        }

        const task = await deleteTaskByIdService(taskId);

        if (task === null) {
            res.status(404).json({ message: "Task Not Found" });
            return;
        }

        res.status(200).json(task);

    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};