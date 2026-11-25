import type { Request, Response } from "express";
import { 
    getProjects,
    getProject,
    createProject,
    patchProject,
    deleteProject
 } from "../services/project.service.js";

export const getProjectsController = async (req: Request, res: Response) => {
    try {
        const projects = await getProjects();

        res.status(200).json(projects);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

export const getProjectByIdController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (Number.isNaN(id) || id <= 0) {
            res.status(400).json({
                message: "Invalid project ID"
            });
            return;
        }

        const project = await getProject(id);

        if (project) {
            res.status(200).json(project);
        } else {
            res.status(404).json({
                message: "Project Not Found"
            });
        }

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

export const createProjectController = async (req: Request, res: Response) => {
    try {
        const { userId, name, description } = req.body;

        if (typeof userId !== "number" || !Number.isInteger(userId) || userId <= 0) {
            res.status(400).json({
                message: "Bad Request"
            });
            return;
        }

        if (typeof name !== "string" || !name.trim() || name.trim().length > 150) {
            res.status(400).json({
                message: "Bad Request"
            });
            return;
        }

        if (description !== undefined && description !== null && typeof description !== "string") {
            res.status(400).json({
                message: "Bad Request"
            });
            return;
        }

        const project = await createProject(userId, name, description);

        res.status(201).json(project);
        
    } catch (error) {
        if (typeof error === "object" && error !== null && "code" in error && error.code === "23503") {
            res.status(400).json({
                message: "User not found"
            });
            return;
        }

        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

export const patchProjectByIdController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            res.status(400).json({
                message: "Bad Request"
            });
            return;
        }

        if (typeof req.body !== "object" || req.body === null || Array.isArray(req.body)) {
            res.status(400).json({
                message: "Request body must be an object"
            });
            return;
        }

        const { name, description } = req.body;

        const allowedFields = ["name", "description"];

        const unknownFields = Object.keys(req.body).filter(
            (field) => !allowedFields.includes(field)
        );

        if (unknownFields.length > 0) {
            res.status(400).json({
                message: "Unknown fields",
                fields: unknownFields
            });
            return;
        }

        if (name === undefined && description === undefined) {
            res.status(400).json({
                message: "At least one field is required"
            });
            return;
        }
        
        if (name !== undefined) {
            if (typeof name !== "string" || !name.trim() || name.trim().length > 150) {
                res.status(400).json({
                    message: "Invalid project name"
                });
                return;
            }
        }

        if (description !== undefined && description !== null && typeof description !== "string") {
            res.status(400).json({
                message: "Invalid project description"
            });
            return;
        }

        const project = await patchProject(id, { name: name?.trim(), description });

        if (!project) {
            res.status(404).json({
                message: "Project not found"
            });
            return;
        }

        res.status(200).json(project);

    } catch (error) {
        console.error(error);

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};

export const deleteProjectByIdController = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        if (!Number.isInteger(id) || id <= 0) {
            res.status(400).json({
                message: "Invalid project ID"
            });
            return;
        }

        const project = await deleteProject(id);

        if (project) {
            res.status(200).json(project);
        } else {
            res.status(404).json({
                message: "Project Not Found"
            });
        }

    } catch (error) {
        console.error(error);

        if (error instanceof Error && "code" in error && error.code === "23503") {
            res.status(409).json({
                message: "Cannot delete project because it has associated tasks"
            });
            return;
        }

        res.status(500).json({
            message: "Internal Server Error"
        });
    }
};