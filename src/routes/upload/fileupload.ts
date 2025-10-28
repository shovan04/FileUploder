import { Router } from "express";
import MulterMiddleware from "../../middleware/multer.js";
import { validateDto } from "../../middleware/valodateDTOs.js";
import { FileUploadRequestDTO } from "../../DTOs/fileUploadRequest.js";
import FileUploadMiddleware from "../../middleware/fileUploadRequest.js";
import fileUploadRequest from "../../middleware/fileUploadRequest.js";
import FileUploadRoutes from "../../config/routes/fileuploads.js";

const filesUploadRouter = Router();

filesUploadRouter.put(
  FileUploadRoutes.PRE_SIGNED_FILE_UPLOAD,
  validateDto(FileUploadRequestDTO, "query"),
  FileUploadMiddleware.upload,
  MulterMiddleware.uploadByType("files", 10),
  fileUploadRequest.upload
);

export default filesUploadRouter;
