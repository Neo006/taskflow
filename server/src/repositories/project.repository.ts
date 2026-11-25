import pool from "../config/database.js";

export const getAllProjects = async () => {
    const result = await pool.query(
        "SELECT * FROM projects ORDER BY created_at DESC"
    );

    return result.rows;
};

export const getProjectById = async (id: number) => {
    const result = await pool.query(
        "SELECT * FROM projects WHERE id = $1",
        [id]
    );

    return result.rows[0];
};

export const createProject = async (userId: number, name: string, description: string) => {
    const result = await pool.query(
        `INSERT INTO projects (user_id, name, description) 
        VALUES ($1, $2, $3) 
        RETURNING *`,
        [userId, name, description]
    );

    return result.rows[0];
};

export const patchProjectById = async (id: number, updates: { name?: string, description?: string | null }) => {
    const fields: string[] = []; 
    const values: (number | string | null)[] = [];

    if (updates.name !== undefined) {
        values.push(updates.name);
        fields.push(`name = $${values.length}`);
    }

    if (updates.description !== undefined) {
        values.push(updates.description);
        fields.push(`description = $${values.length}`);
    }

    if (values.length === 0) {
        throw new Error("No fields provided for update");
    }

    fields.push("updated_at = CURRENT_TIMESTAMP");
    values.push(id);

    const query = `
        UPDATE projects
        SET ${fields.join(", ")}
        WHERE id = $${values.length}
        RETURNING *
    `;

    const result = await pool.query(query, values);

    return result.rows[0];
};

export const deleteProjectById = async (id: number) => {
    const result = await pool.query(
        `DELETE FROM projects
        WHERE id = $1
        RETURNING *`,
        [id]
    );

    return result.rows[0];
};