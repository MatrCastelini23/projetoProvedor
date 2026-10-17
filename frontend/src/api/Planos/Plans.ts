import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export interface IPlan {
  id: number;
  name: string;
  description: string;
  price: number;
  valorExcedente: number;
  totalDids: number;
  valorPorCanal: number;
}

export const createPlan = async (plan: IPlan) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(`${BASE_URL}/v1/plan`, plan, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return response.data;
}

export const alterPlan = async (id: number, plan: IPlan) => {
  const token = localStorage.getItem("token");
  const response = await axios.patch(`${BASE_URL}/v1/plan/${id}`, plan, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return response.data;
}