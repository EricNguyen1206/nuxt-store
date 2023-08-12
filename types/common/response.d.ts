export interface IBasicApiResponse {
  message: string;
  status: number;
}

export interface IApiResponse<T> extends IBasicApiResponse {
  data: T;
}

export interface IApiListResponse<T> extends IApiResponse<T[]> {
  total: number;
}
