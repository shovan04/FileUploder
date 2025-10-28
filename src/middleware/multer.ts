import multer from "multer";
import path from "node:path";
import fs from "node:fs";
import { FileUploadOptions } from "../constants/FileUploadOptions.js";
import { NextFunction, Request, Response } from "express";
import ErrorInterface from "../interfaces/errorInterface.js";

class MulterMiddleware {

    private multerInstance: multer.Multer;

    constructor() {
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                const uploadPath = path.resolve(process.cwd(), "files");
                if (!fs.existsSync(uploadPath)) {
                    fs.mkdirSync(uploadPath, { recursive: true });
                }
                cb(null, uploadPath);
            },
            filename: function (req, file, cb) {
                cb(null, Date.now() + '_' + file.originalname);
            }
        });
        this.multerInstance = multer({
            storage, limits: {
                fileSize: FileUploadOptions.MAX_FILE_SIZE
            },
            fileFilter(req, file, cb) {
                if (!FileUploadOptions.ALLOWED_FILE_TYPES.includes(file.mimetype)) {
                    return cb(new Error("File type not allowed"));
                }
                cb(null, true);
            },
        });
    }

    singleFile(fieldName: string) {
        try {
            return this.multerInstance.single(fieldName);
        } catch (error: any & ErrorInterface ) {
            if (error instanceof multer.MulterError) {
                throw new Error(`Multer error: ${error?.message}`);
            } else {
                throw new Error(`Unexpected error: ${error?.message}`);
            }
        }
    }

    multipleFiles(fieldName: string, maxCount: number) {
        try {
            return this.multerInstance.array(fieldName, maxCount);
        } catch (error: any & ErrorInterface) {
            if (error instanceof multer.MulterError) {
                throw new Error(`Multer error: ${error?.message}`);
            } else {
                throw new Error(`Unexpected error: ${error?.message}`);
            }
        }
    }

    uploadByType(filename: string, maxCount?: number) {
        return (req: Request, res: Response, next: NextFunction) => {
            const filetype = req.params.type;

            if (filetype === 'single') {
                return this.singleFile(filename)(req, res, next);
            } else if (filetype === 'multiple') {
                return this.multipleFiles(filename, maxCount || 5)(req, res, next);
            } else {
                next(new Error("Invalid file upload type."));
            }
        }
    }

}

export default new MulterMiddleware();