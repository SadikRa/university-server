import { ZodError, ZodIssue } from "zod";

const handleZodError = (err: ZodError) => {

    const errorSource = err.issues.map((issue: ZodIssue) => {
      return {
        path: issue?.path[issue.path.length-1],
        massage: issue.message 
      }
    })

    const statusCode = 400

    return {
      statusCode,
      massage: 'zod validation error',
      errorSource,
    }
  };

  export default handleZodError;