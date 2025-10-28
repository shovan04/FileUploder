import { Request, Response, NextFunction } from 'express';
import FileSignatureGen from '../utils/signature.js';


interface PreSignedFileQuery {
  filename: string;
  type: number;
  ex: string;
  sig: string;
}

class FileUploadMiddleware {
    upload(req: Request, res: Response, next: NextFunction) {
        const { filename, type, ex, sig } = req.query as unknown as PreSignedFileQuery;

        const isSigValid = new FileSignatureGen().verifySignature({ filename, type, ex }, sig)
        if (!isSigValid) {
            throw new Error("Invalid signature.");
        }

        const isNotExpired = Number(ex) > Math.floor(Date.now() / 1000);
        if (!isNotExpired) {
            throw new Error("File upload timeout.");
        }

        next();
    }
}

export default new FileUploadMiddleware();   