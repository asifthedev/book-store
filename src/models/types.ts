export interface Book {
  id: number;
  title: string;
  author: string;
}

export interface ResponseError {
  message: string;
}

export interface RouteDefination {
  method: string;
  path: string;
  prompt: string;
}
