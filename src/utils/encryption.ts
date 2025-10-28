import crypto from "crypto";

const ALGORITHM = "aes-256-ctr";
const SECRET_KEY = crypto
  .createHash("sha256")
  .update(String(process.env.FILE_ENCRYPTION_KEY || "default_key"))
  .digest("base64")
  .substring(0, 32);
const IV_LENGTH = 16;
const FILE_MAGIC = process.env.FILE_UPLOADER_ISE || "instaPlannerSecure";

export default class EncryptionUtil {
  // Encrypt filename with secret tag
  static encryptFilename(originalId: string): string {
    const iv = crypto.randomBytes(IV_LENGTH);
    const dataToEncrypt = `${originalId}_#${FILE_MAGIC}`;
    const cipher = crypto.createCipheriv(ALGORITHM, SECRET_KEY, iv);
    const encrypted = Buffer.concat([
      cipher.update(dataToEncrypt, "utf8"),
      cipher.final(),
    ]);
    return iv.toString("hex") + ":" + encrypted.toString("hex");
  }

  // Decrypt and validate
  static decryptAndValidateFilename(encryptedFilename: string): string | null {
    try {
      const [ivHex, encryptedHex] = encryptedFilename.split(":");
      const iv = Buffer.from(ivHex as string, "hex");
      const encryptedText = Buffer.from(encryptedHex as string, "hex");

      const decipher = crypto.createDecipheriv(ALGORITHM, SECRET_KEY, iv);
      const decrypted = Buffer.concat([
        decipher.update(encryptedText),
        decipher.final(),
      ]);
      const decryptedStr = decrypted.toString("utf8");

      // Verify embedded secret
      if (!decryptedStr.endsWith(`_#${FILE_MAGIC}`)) return null;

      // Return just the original ID
      return decryptedStr.replace(`_#${FILE_MAGIC}`, "");
    } catch {
      return null;
    }
  }
}
