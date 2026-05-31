import express from "express";
import cors from "cors";
import studentRoutes from "./routes/studentRoutes";
import taskRoutes from "./routes/taskRoutes";
import requestLogger from "./middleware/requestLogger";
import errorHandler from "./middleware/errorHandler";

const app = express();
app.use(cors());
app.use(express.json());

// Request logging
app.use(requestLogger);

app.use("/students", studentRoutes);
app.use("/tasks", taskRoutes);

// Error handling middleware 
app.use(errorHandler);

const PORT = process.env.PORT || 4000;
app.listen(PORT, () => {
    console.log(`Action center server listening on http://localhost:${PORT}`);
});
