
export interface ResponseT<T> {
    isSuccess: boolean;
    data?: T;
    message?: string;
    statusCode: number;
    timestamp: string;
    errorDetails?: any;
  }