import { isNotEmpty, IsNotEmpty, IsString } from "class-validator";

export class FileUploadRequestDTO {
    @IsNotEmpty({ message: "Filename is required" })
    @IsString()
    filename!: string;

    @IsNotEmpty({ message: "Type is required" })
    @IsString()
    type!: string;

    @IsNotEmpty({ message: "Ex is required" })
    @IsString()
    ex!: string;

    @IsNotEmpty({ message: "Sig is required" })
    @IsString()
    sig!: string;
}