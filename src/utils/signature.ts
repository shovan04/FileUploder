import crypto from 'node:crypto';
import { FileSignatureTypes } from '../interfaces/fileSignature.js';

class FileSignature {
    generateSignature(inData: FileSignatureTypes): string {
        const secret = process.env.FILE_UPLOAD_SIGNATURE_SECRET || 'hhasgfhjsjvfjsyyfyfs';
        const data = `${inData.filename}:${inData.type}:${inData.expiry}`;
        return crypto.createHmac("sha256", secret).update(data).digest("hex");
    }

    verifySignature(inData: FileSignatureTypes, signature: string): boolean {
        const expectedSignature = this.generateSignature(inData);
        return expectedSignature === signature;
    }
}

export default FileSignature;