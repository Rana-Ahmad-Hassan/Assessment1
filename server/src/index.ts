import express from "express";
import cors from "cors";
import studentRoutes from "./routes/studentRoutes";
import taskRoutes from "./routes/taskRoutes";

const app = express();
app.use(cors());
app.use(express.json());

app.use("/students", studentRoutes);
app.use("/tasks", taskRoutes);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`Action center server listening on http://localhost:${PORT}`);
});
