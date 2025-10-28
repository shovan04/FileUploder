import { Request, Response, NextFunction } from "express";
import FileUploaderService from "../services/fileUploader.service.js";
import { ResponseDTO } from "../DTOs/response.DTO.js";
import HttpResponseCode from "../constants/httpResponseCode.js";
class FileUploadController {
  static upload(req: Request, res: Response) {
    if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
      throw new Error("No files were uploaded.");
    }
    const response = new ResponseDTO();

    const files = req.files.map((file) => file.filename);

      response.setStatus(true);
      response.setMessage("Files uploaded successfully");
      response.setData({filesName: files});

      return res.status(HttpResponseCode.CREATED).json(response);
  }

  static generatePreSignedUrl(req: Request, res: Response, next: NextFunction) {
    try {
      const response = new ResponseDTO();
    //   get presigned url from service
      const preSignedUrl = new FileUploaderService().generatePreSignedUri();

      response.setStatus(true);
      response.setMessage("Pre Signed URL generated");
      response.setData({ preSignedUrl });

      return res.status(HttpResponseCode.OK).json(response);
    } catch (error) {
      next(error);
    }
  }
}

export default FileUploadController;
