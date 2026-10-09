import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

export interface ICreatePlan {
  name: string,
  description: string,
  price: number,
  totalDids: number
}


export const createPlan = async (plan: ICreatePlan) => {
  const token = localStorage.getItem("token");
  const response = await axios.post(`${BASE_URL}/createPlan`, plan, {
    headers: { Authorization: `Bearer ${token}` }
  })
  return response.data;
}