import { Request, RequestHandler } from "express";
import { ErrorFormatter, Location, matchedData, ValidationChain, validationResult } from "express-validator";

import {
	ReasonPhrases,
	StatusCodes,
} from 'http-status-codes';

export const validationErrorFormatter: ErrorFormatter = (error) => {
  const data: {[index: string]: string | string[] | Location | undefined | null} = {
    name: ReasonPhrases.BAD_REQUEST,
    message: error.msg,
    param: error.param,
    location: error.location,
    nestedErrors: null
  };

  if (Array.isArray(error.nestedErrors)) {
    data.nestedErrors = error.nestedErrors.map(validationErrorFormatter);
    delete data.param;
  }

  return data;
};

export const handleValidations: RequestHandler = (request: any, response, next) => {
  const errors = validationResult(request).formatWith(validationErrorFormatter);
  if (errors.isEmpty()) {
    request["validData"] = matchedData(request);
    next();
  } else {
    response.status(StatusCodes.BAD_REQUEST).json({ errors: errors.array() });
  }
};


export const validate = (validators: ValidationChain[]): RequestHandler[] => {
  return [...validators, handleValidations];
};
