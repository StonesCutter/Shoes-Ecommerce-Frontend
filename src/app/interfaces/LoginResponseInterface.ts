export interface LoginResponse {
  email: string;
  permission: string[];
  id: number;
  token: string;
  refreshToken: string;
}
