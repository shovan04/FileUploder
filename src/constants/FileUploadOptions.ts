export class FileUploadOptions {
    static readonly MAX_FILE_SIZE: number = 50 * 1024 * 1024
    static readonly ALLOWED_FILE_TYPES: string[] = ['image/jpeg', 'image/png', 'application/pdf', 'video/mp4']
}