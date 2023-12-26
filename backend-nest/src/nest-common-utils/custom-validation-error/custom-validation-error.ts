import { ValidationError } from "class-validator";

export const getAllConstraints = function(errors: ValidationError[]): string[] {
    const constraints: string[] = [];
  
    for (const error of errors) {
      if (error.constraints) {
        const constraintValues = Object.values(error.constraints);
        constraints.push(...constraintValues);
      }
  
      if (error.children && error.children.length > 0) {
        const childConstraints = getAllConstraints(error.children);
        constraints.push(...childConstraints);
      }
    }
  
    return constraints;
}