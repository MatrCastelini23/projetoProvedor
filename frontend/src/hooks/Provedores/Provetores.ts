import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";

const BASE_URL = import.meta.env.VITE_API_URL;

interface IProvider {
  id: number;
  razaosocial: string;
  email: string;
  phone: string;
  dataCadastro: Date;
  plan_id: number;
  cnpj: string;
}

interface IUseFetchProviders {
  providers: IProvider[] | null;
  loading: boolean;
  error: unknown;
}

interface IUseFetchProvider {
  provider: IProvider | null;
  loading: boolean;
  error: unknown;
}


export function useFetchProviders(): IUseFetchProviders {
  const [providers, setProviders] = useState<IProvider[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`${BASE_URL}/providers`, {
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      }
    })
      .then(res => { setProviders(res.data); setLoading(false) })
      .catch((err: AxiosError) => { setError(err); setLoading(false) })
  }, [])

  return { providers, loading, error };
}

export function useFetchProvider(id: number): IUseFetchProvider {
  const [provider, setProvider] = useState<IProvider | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<AxiosError | null>(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get(`${BASE_URL}/provider/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        'authorization': `Bearer ${token}`
      }
    })
      .then(res => { setProvider(res.data); setLoading(false) })
      .catch((err: AxiosError) => { setError(err); setLoading(false) })
  }, [])

  return { provider, loading, error };
}