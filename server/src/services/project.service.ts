import { 
    getAllProjects, 
    getProjectById,
    createProject as createProjectRepository,
    patchProjectById,
    deleteProjectById
} from "../repositories/project.repository.js";

export const getProjects = async () => {
    const projects = await getAllProjects();
    return projects;
};

export const getProject = async (id: number) => {
    const project = await getProjectById(id);
    return project;
};

export const createProject = async (userId: number, name: string, description: string) => {
    const project = await createProjectRepository(userId, name, description);
    return project;
};

export const patchProject = async (id: number, updates: { name?: string, description?: string | null }) => {
    const project = await patchProjectById(id, updates);
    return project;
};

export const deleteProject = async (id: number) => {
    const project = await deleteProjectById(id);
    return project;
};