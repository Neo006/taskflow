import { 
    getTasksByProjectId,
    getTaskById,
    createTaskRepository,
    patchTaskByIdRepository,
    deleteTaskByIdRepository
} from "../repositories/task.repository.js";
import { getProjectById } from "../repositories/project.repository.js";

export const getTasksByProject = async (projectId: number) => {
    const project = await getProjectById(projectId);

    if (!project) {
        return null;
    }

    const tasks = await getTasksByProjectId(projectId);
    return tasks;
};

export const getTask = async (taskId: number) => {
    const task = await getTaskById(taskId);
    return task;
};

export const createTaskService = async (
    projectId: number,
    title: string,
    description?: string | null,
    status?: string,
    priority?: string,
    dueDate?: string | null
) => {
    const project = await getProjectById(projectId);

    if (!project) {
        return null;
    }
    const task = await createTaskRepository(
        projectId,
        title,
        description ?? null,
        status ?? "todo",
        priority ?? "medium",
        dueDate ?? null
    );

    return task;
}; 

export const patchTaskByIdService = async (
    id: number, 
    updates: {
        title?: string,
        description?: string | null,
        status?: string,
        priority?: string
        dueDate?: string | null
    }
) => {
    const task = await patchTaskByIdRepository(id, updates);
    return task;
};

export const deleteTaskByIdService = async (id: number) => {
    const task = await deleteTaskByIdRepository(id);
    return task;
};