import { Request, Response, NextFunction } from "express";
import FileUploaderService from "../services/fileUploader.service.js";
import { ResponseDTO } from "../DTOs/response.DTO.js";
class FileUploadController {
  static upload(req: Request, res: Response) {
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      throw new Error("No files were uploaded.");
    }

    const files = req.files.map((file) => ({
      originalName: file.originalname,
      storedName: file.filename,
      path: `/files/${file.filename}`,
    }));

    return res.status(200).json({
      message: "Files uploaded successfully",
      files,
    });
  }

  static generatePreSignedUrl(req: Request, res: Response, next: NextFunction) {
    try {
      const response = new ResponseDTO();
    //   get presigned url from service
      const preSignedUrl = new FileUploaderService().generatePreSignedUri();

      response.setStatus(true);
      response.setMessage("Pre Signed URL generated");
      response.setData({ preSignedUrl });

      return res.status(200).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export default FileUploadController;
