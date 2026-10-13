import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";

const BASE_URL = import.meta.env.VITE_API_URL;

interface IPlan {
  id: number;
  name: string;
  description: string;
  price: number;
  totalDids: number;
  valorExcedente: number;
}

interface IUseFetchPlans {
  plans: IPlan[] | null;
  loading: boolean;
  error: unknown;
}

interface IUseFetchPlan {
  plan: IPlan | null;
  loading: boolean;
  error: unknown;
}

export function useFetchPlans(): IUseFetchPlans {
  const [plans, setPlan] = useState<IPlan[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`${BASE_URL}/getPlans`, {
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      }
    })
      .then(res => { setPlan(res.data); setLoading(false) })
      .catch((err: AxiosError) => { setError(err); setLoading(false) })
  }, []);

  return { plans, loading, error };
}

export function useFetchPlan(id: number): IUseFetchPlan {
  const [plan, setPlan] = useState<IPlan | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`${BASE_URL}/getPlan/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    })
      .then(res => { setPlan(res.data); setLoading(false) })
      .catch((err: AxiosError) => { setError(err); setLoading(false) })
  }, [])

  return { plan, loading, error };
}