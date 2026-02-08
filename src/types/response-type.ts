export type SuccessResponse<T = void> = {
  success: true;
  message: string;
  data?: T;
};

