export interface CommonSuccessResponse<T> {
  message: string;
  data: T;
}

export interface CommonFailureResponse {
  message: string | string[];
  statusCode: number;
  error: string;
}
