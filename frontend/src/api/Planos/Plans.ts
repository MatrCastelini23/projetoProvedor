import { useEffect, useState } from "react";
import axios, { AxiosError } from "axios";
import type { Plan } from "../../models/PlansEntity";

const BASE_URL = import.meta.env.VITE_API_URL;

interface IUseFetchPlans {
  plans: Plan[] | null;
  loading: boolean;
  error: unknown;
}

function useFetchPlans(): IUseFetchPlans {
  const [plans, setPlan] = useState<Plan[] | null>(null);
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

export default useFetchPlans;