import type { IDids } from "../Dids/Dids";

export interface IProvidesClients {
  id: number;
  razaosocial: string;
  cnpjCpf: string;
  email: string;
  phone: string;
  dataCadastro: string;
  provider_id: number;
  dids: IDids[];
}