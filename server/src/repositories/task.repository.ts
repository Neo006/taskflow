import { title } from "node:process";
import pool from "../config/database.js";

export const getTasksByProjectId = async (projectId: number) => {
    const result = await pool.query(
        `SELECT *
        FROM tasks
        WHERE project_id = $1
        ORDER BY created_at DESC`,
        [projectId]
    );

    return result.rows;
};

export const getTaskById = async (taskId: number) => {
    const result = await pool.query(
        `SELECT *
        FROM tasks
        WHERE id = $1`,
        [taskId]
    );

    return result.rows[0] ?? null;
};

export const createTaskRepository = async (
    projectId: number,
    title: string,
    description: string | null,
    status: string,
    priority: string,
    dueDate: string | null
) => {
    const result = await pool.query(
        `INSERT INTO tasks (project_id, title, description, status, priority, due_date)
        VALUES ($1, $2, $3, $4, $5, $6)
        RETURNING *`,
        [projectId, title, description, status, priority, dueDate]
    );

    return result.rows[0];
};

export const patchTaskByIdRepository = async (
    id: number, 
    updates: {
        title?: string,
        description?: string | null,
        status?: string,
        priority?: string
        dueDate?: string | null
    }
) => {
    const fields: string[] = [];
    const values: (number | string | null)[] = [];

    if (updates.title !== undefined) {
        values.push(updates.title);
        fields.push(`title = $${values.length}`);
    }

    if (updates.description !== undefined) {
        values.push(updates.description);
        fields.push(`description = $${values.length}`);
    }

    if (updates.status !== undefined) {
        values.push(updates.status);
        fields.push(`status = $${values.length}`);
    }

    if (updates.priority !== undefined) {
        values.push(updates.priority);
        fields.push(`priority = $${values.length}`);
    }

    if (updates.dueDate !== undefined) {
        values.push(updates.dueDate);
        fields.push(`due_date = $${values.length}`);
    }

    if (values.length === 0) {
        throw new Error("No fields provided for update");
    }

    fields.push("updated_at = CURRENT_TIMESTAMP");
    values.push(id);

    const query = `
        UPDATE tasks
        SET ${fields.join(", ")}
        WHERE id = $${values.length}
        RETURNING *
    `;

    const result = await pool.query(query, values);

    return result.rows[0] ?? null;
};

export const deleteTaskByIdRepository = async (id: number) => {
    const result = await pool.query(
        `DELETE FROM tasks
        WHERE id = $1
        RETURNING *`,
        [id]
    );

    return result.rows[0] ?? null;
};