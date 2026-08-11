import axios from "axios"

const BASE_URL = import.meta.env.VITE_URL_BASE;

export async function Logar(data: { email: string, password: string }) {
    const user = await axios.post(`${BASE_URL}/login`, data);
    return user
}