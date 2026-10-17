import axios from "axios";
import type { IDids } from "../Dids/Dids";

const BASE_URL = import.meta.env.VITE_API_URL

export interface IProviderClient {
  razaosocial: string;
  cnpjCpf: string;
  email: string;
  phone: string;
  providerId: number;
  dids: IDids[];
}

export const createClient = async (providerClient: IProviderClient) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(`${BASE_URL}/v1/client`, providerClient, {
    headers: { Authorization: `Bearer ${token}` }
  })

  return response.data;
}