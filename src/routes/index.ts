import { Router, Request, Response } from "express";
import FileUploadRoutes from "../config/routes/fileuploads.js";
import filesUploadRouter from "./upload/fileupload.js";

const mainRouter = Router();


mainRouter.use(FileUploadRoutes.BASE_PATH, filesUploadRouter)

mainRouter.get("/", (req: Request, res: Response): void => {
  res.send("Welcome to the API");
});

export default mainRouter;
