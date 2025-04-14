export interface ValidationError {
  [key: string]: string[];
}

export interface ApiError {
  type: string;
  title: string;
  status: number;
  errors: ValidationError;
  traceId: string;
}
