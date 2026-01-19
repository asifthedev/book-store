export interface ApiSuccessResponse<T = any> {
  success: boolean;
  data: T;
  message?: string;
}

export interface ApiErrorResponse {
  success: boolean;
  message: string;
  errors?: Array<{ field: string; message: string }>;
}
