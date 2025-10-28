
export default class ConstraintValidationErrorResponseDTO {
    path!: string;
    status!: number
    message!: string;
    validationErrors!: Record<string, string>;

    constructor(path: string, status: number, message: string, validationErrors: Record<string, string>) {
        this.path = path;
        this.status = status;
        this.message = message;
        this.validationErrors = validationErrors;
    }
}
