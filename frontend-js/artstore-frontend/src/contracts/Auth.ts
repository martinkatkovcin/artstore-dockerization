export interface RegisterData {
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  email: string;
  phone_number: string;
  role: string;
}

export interface AuthResponse {
  id: number,
  first_name: string;
  last_name: string;
  username: string;
  password: string;
  email: string;
  phone_number: string;
  role: string;
}

export interface LoginData {
  username: string,
  password: string;
}
