import { Router } from "express";
import MulterMiddleware from "../../middleware/multer.js";
import { validateDto } from "../../middleware/valodateDTOs.js";
import { FileUploadRequestDTO } from "../../DTOs/fileUploadRequest.js";
import FileUploadMiddleware from "../../middleware/fileUploadRequest.js";
import FileUploadRoutes from "../../config/routes/fileuploads.js";
import FileUploadController from "../../controllers/fileUploader.js";

const filesUploadRouter = Router();

filesUploadRouter.post(
  FileUploadRoutes.PRE_SIGNED_FILE_UPLOAD,
  validateDto(FileUploadRequestDTO, "query"),
  FileUploadMiddleware.upload,
  MulterMiddleware.uploadByType("files", 10),
  FileUploadController.upload
);

filesUploadRouter.get(FileUploadRoutes.GENERATE_PRE_SIGNED_FILE_UPLOAD_URL, FileUploadController.generatePreSignedUrl);


export default filesUploadRouter;
