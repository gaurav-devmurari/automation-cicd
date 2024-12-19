export interface UserRegistrationDetails {
  name: string;
  email: string;
  password: string;
}

export interface UserRegistrationResponse {
  message: string;
  statusCode?: string;
  error?: string;
}
