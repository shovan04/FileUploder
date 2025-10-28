import { Request, Response, NextFunction } from "express";
import FileSignatureGen from "../utils/signature.js";
import { FileSignatureTypes } from "../interfaces/fileSignature.js";
import FileUploaderService from "../services/fileUploader.service.js";

class FileUploadMiddleware {
  upload(req: Request, res: Response, next: NextFunction) {
    const { filename, type, expiry, sig } =
      req.query as unknown as FileSignatureTypes;

    const decryptedFileName = new FileUploaderService().validatePreSignedUri(
      filename,
      expiry
    );

    // Verify signature
    const isSigValid = new FileSignatureGen().verifySignature(
      { filename: decryptedFileName, type, expiry },
      sig as string
    );
    if (!isSigValid) {
      throw new Error("Invalid signature.");
    }

    const isTimeExpired = Math.floor(Date.now() / 1000) > Number(expiry);
    if (isTimeExpired) {
      throw new Error("File upload timeout.");
    }

    next();
  }
}

export default new FileUploadMiddleware();
