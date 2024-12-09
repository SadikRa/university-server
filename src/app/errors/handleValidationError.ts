import { TErrorSource } from './../interface/error';
import mongoose from 'mongoose';

type TGenericErrorResponse = {
  statusCoded: string;
  massage: string;
  errorSources: TErrorSource;
}

const handleValidationError = (err: mongoose.Error.ValidationError) => {
  // Map over the errors to create a structured error source array
  const errorSource: TErrorSource = Object.values(err.errors).map((val: mongoose.Error.ValidatorError | mongoose.Error.CastError) => ({
    path: val?.path || 'unknown',
    message: val?.message || 'Validation error',
  }));

  

  const statusCode = 400;
  return {
    statusCode,
    message: 'Validation error occurred',
    errorSource, // Include the processed errors
  };
};

export default handleValidationError;
