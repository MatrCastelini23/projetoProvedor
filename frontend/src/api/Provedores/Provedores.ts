import axios from "axios";


const BASE_URL = import.meta.env.VITE_API_URL;

export interface IProvider {
  id: number;
  razaosocial: string;
  email: string;
  phone: string;
  planoId: number;
  cnpj: string;
}

export const createProvider = async (provider: IProvider) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(`${BASE_URL}/createProvider`, provider, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return response.data;
}