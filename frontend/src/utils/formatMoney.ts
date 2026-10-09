interface IFormatMoneyProps {
  value: number;
  fractionDigits?: number;
}

export function formatMoney({ value, fractionDigits = 0 }: IFormatMoneyProps) {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
    minimumFractionDigits: fractionDigits,
    maximumFractionDigits: fractionDigits,
  }).format(value);
}