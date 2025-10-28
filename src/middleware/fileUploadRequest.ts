import { Request, Response, NextFunction } from 'express';
import FileSignatureGen from '../utils/signature.js';
import { FileSignatureTypes } from '../interfaces/fileSignature.js';

class FileUploadMiddleware {
    upload(req: Request, res: Response, next: NextFunction) {
        const { filename, type, expiry, sig } = req.query as unknown as FileSignatureTypes;

        // Verify signature
        const isSigValid = new FileSignatureGen().verifySignature({ filename, type, expiry }, sig as string);
        if (!isSigValid) {
            throw new Error("Invalid signature.");
        }

        const isTimeExpired =  Math.floor(Date.now() / 1000) > Number(expiry);
        if (isTimeExpired) {
            throw new Error("File upload timeout.");
        }

        next();
    }
}

export default new FileUploadMiddleware();   