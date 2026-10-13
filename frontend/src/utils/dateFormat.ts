export function dateFomart(data: string): string {
  if (!data) return "-";

  const [ano, mes, dia] = data.split("T")[0].split("-");
  return `${dia}/${mes}/${ano}`;
}