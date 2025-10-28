import FileUploadRoutes from "../config/routes/fileuploads.js";
import EncryptionUtil from "../utils/encryption.js";
import FileSignature from "../utils/signature.js";
import { randomUUID } from "node:crypto";

export default class FileUploaderService {
  generatePreSignedUri() {
    const filename = randomUUID().split("-").join("");
    const fileType = "multiple";
    const expiry = Math.floor(Date.now() / 1000) + 10 * 60; // 15 minutes from now
    // Generateing signature
    const signature = new FileSignature().generateSignature({
      filename,
      type: fileType,
      expiry,
    });

    const secureFileName = EncryptionUtil.encryptFilename(
      `${filename}_#${expiry}`
    );

    return `http://${process.env.BACKEND_URI}${process.env.BASE_API_PATH}${FileUploadRoutes.BASE_PATH}${FileUploadRoutes.PRE_SIGNED_FILE_UPLOAD}?filename=${secureFileName}&type=${fileType}&expiry=${expiry}&sig=${signature}`;
  }
}
