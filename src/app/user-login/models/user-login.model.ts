export interface UserLogin {
  email: string;
  password: string;
}

export interface User {
  id: string;
  email: string;
  image?: string;
}

export interface UserLoginResponse {
  access_token: string;
}
