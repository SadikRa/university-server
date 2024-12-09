export type TErrorSource = {
    path: string | number;
    massage: string;
  }[];

  export type TGenericErrorResponse = {
    statusCode: number;
    message: string;
    errorSources: TErrorSource;
  }[];