import { plainToInstance } from "class-transformer";
import { validate, ValidationError } from "class-validator";
import { NextFunction, Request, Response } from "express";

export const validateDto = (
  DtoClass: any,
  source: "body" | "query" | "params" = "body"
) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    const dtoObj = plainToInstance(DtoClass, req[source]);
    const errors = await validate(dtoObj);

    if (errors.length > 0) {
      // safely extract constraint messages
      const messages = errors
        .map((err: ValidationError) =>
          err.constraints ? Object.values(err.constraints) : []
        )
        .flat();

      throw new Error(`Validation failed: ${messages.join(", ")}`);
    }

    // ✅ assign the validated DTO back, so other middlewares can trust it
    req[source] = dtoObj as any;
    next();
  };
};
