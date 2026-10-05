import { useCallback, useMemo, useState } from "react";

export function useMoneyInput(initialValue = 0) {
  const [rawValue, setRawValue] = useState(initialValue);

  const value = useMemo(() => {
    return rawValue.toLocaleString('pt-BR', {
      style: 'currency',
      currency: 'BRL',
      minimumIntegerDigits: 2,
      maximumFractionDigits: 2,
    })
  }, [rawValue]);

  const onChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const digits = e.target.value.replace(/\D/g, '');
    setRawValue(Number(digits) / 100);
  }, []);

  const reset = useCallback(() => setRawValue(initialValue), [initialValue]);

  return { value, rawValue, onChange, setRawValue, reset };
}