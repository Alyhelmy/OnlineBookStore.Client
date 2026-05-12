export interface ApiResponse<T> { //this interface is used to define the structure of the response from the API
  isSuccess: boolean;
  message: string;
  data: T;
}
