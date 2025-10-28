import { Request, Response, NextFunction } from "express";
import FileSignatureGen from "../utils/signature.js";

class fileUploaderRequest {

    upload(req: Request, res: Response) {
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
}