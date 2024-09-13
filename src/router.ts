import { Express } from "express";
import taskRouter from "./routes/task";

const initializeRoutes  = (app:Express)=>{
    app.use("/task",taskRouter)
}

export default initializeRoutes