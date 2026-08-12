import axios from "axios"

const BASE_URL = import.meta.env.VITE_URL_BASE;

export interface ILoginCredentials {
  email: string,
  password: string,
}

export interface ILoginResponse {
  token: string;
}

export async function Logar(data: ILoginCredentials) {
  const response = await axios.post<ILoginResponse>(`${BASE_URL}/login`, data);
  return response.data;
}