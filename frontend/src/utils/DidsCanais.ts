import type { IDids } from "../hooks/Dids/Dids";

export function totaisDoClienteFinal(dids: IDids[] = []) {
  return {
    totalDids: dids.length,
    totalCanais: dids.reduce((soma, d) => soma + (Number(d.canais) || 0), 0)
  }
}