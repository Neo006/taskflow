import express  from "express";
import projectRoutes from "./routes/project.routes.js";
import taskRoutes from "./routes/task.routes.js";
import taskByIdRoutes from "./routes/task-by-id.routes.js";

const app = express();

app.use(express.json());

app.use("/api/projects", projectRoutes);
app.use("/api/projects", taskRoutes);
app.use("/api/tasks", taskByIdRoutes);

app.listen(3000, () => {
    console.log("TaskFlow API is running on http://localhost:3000");
});