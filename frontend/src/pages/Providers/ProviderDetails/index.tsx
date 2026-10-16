import { useNavigate, useParams } from "react-router-dom";
import { useFetchProvider } from "../../../hooks/Provedores/Provetores"
import Spinner from "../../../components/ui/effects/Spinner";
import axios from "axios";
import { LoginRediretion } from "../../../services/LoginRediretion";
import { Header } from "../../../components/layoout/Header";
import { Footer } from "../../../components/layoout/Footer";
import { MessageNull } from "../../../components/ui/Message/MessageNull";
import { dateFomart } from "../../../utils/dateFormat";
import { totaisDoClienteFinal } from "../../../utils/DidsCanais";
import { formatMoney } from "../../../utils/formatMoney";

export const ProviderDetails = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const idNumber = Number(id);
  const { provider, loading, error } = useFetchProvider(idNumber);
  const totalProvedor = provider?.clients.reduce(
    (acc, c) => {
      const t = totaisDoClienteFinal(c.dids);
      return {
        dids: acc.dids + t.totalDids,
        canais: acc.canais + t.totalCanais,
      };
    }, { dids: 0, canais: 0 },
  );

  if (loading) return (
    <Spinner />
  )
  if (error) {
    if (axios.isAxiosError(error)) {
      if (error.response?.status === 403) {
        return <LoginRediretion error={error} />;
      }

      const backendMessage = (error.response?.data as any)?.message;
      const mensagemErro = backendMessage || error.message || "Erro ao carregar planos";

      return (
        <div style={{ color: "red", padding: "20px" }}>
          <h1>Erro no carregamento</h1>
          <p>{mensagemErro}</p>
        </div>
      );
    }
  }
  if (!provider) return <MessageNull message="Provedor não encontrado" />

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Header />
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-black mb-6">Detalhes do provedor</h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-10">
          <section className="rounded-2xl border-2 border-amber-700 p-6">
            <h2 className="text-lg font-bold text-blue-950 mb-4 pb-2 border-b-2 border-amber-700">
              Dados Cadastrais
            </h2>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-xs uppercase text-gray-500">Razão social</dt>
                <dd className="font-semibold">{provider.razaosocial}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase text-gray-500">CNPJ</dt>
                <dd>{provider.cnpj}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase text-gray-500">Telefone</dt>
                <dd>{provider.phone}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase text-gray-500">E-mail</dt>
                <dd>{provider.email}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase text-gray-500">Data de cadastro</dt>
                <dd>{dateFomart(provider.dataCadastro)}</dd>
              </div>
            </dl>

            <div className="grid grid-cols-2 gap-3 mt-5">
              <div className="rounded-xl bg-blue-950 text-white p-3 text-center">
                <p className="text-2xl font-bold">{totalProvedor?.dids ?? 0}</p>
                <p className="text-xs uppercase">Total de DIDs</p>
              </div>
              <div className="rounded-xl bg-blue-950 text-white p-3 text-center">
                <p className="text-2xl font-bold">{provider.canaisAdicionais ?? 0}</p>
                <p className="text-xs uppercase">Canais adicionais</p>
              </div>
            </div>
          </section>

          <section className="rounded-2xl border-2 border-amber-700 p-6">
            <h2 className="text-lg font-bold text-blue-950 mb-4 pb-2 border-b-2 border-amber-700">
              Plano Cadastrado
            </h2>
            <dl className="space-y-3 text-sm">
              <div>
                <dt className="text-xs uppercase text-gray-500">Plano</dt>
                <dd className="font-semibold">{provider.plano?.name ?? <span className="text-gray-500 italic">Sem plano Cadastrado</span>}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase text-gray-500">DIDs incluídos</dt>
                <dd>{provider.plano?.totalDids}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase text-gray-500">Valor do Pacote</dt>
                <dd className="font-semibold">{formatMoney({ value: provider.plano.price, fractionDigits: 2 })}</dd>
              </div>
              <div>
                <dt className="text-xs uppercase text-gray-500">Valor excedente</dt>
                <dd>
                  {provider.plano?.valorExcedente
                    ? formatMoney({ value: provider.plano.valorExcedente, fractionDigits: 2 })
                    : "—"}
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase text-gray-500">Valor por Canal</dt>
                <dd>
                  {provider.plano?.valorPorCanal
                    ? formatMoney({ value: provider.plano.valorPorCanal, fractionDigits: 2 })
                    : "—"}
                </dd>
              </div>
            </dl>
            <div className="grid grid-cols-2 gap-3 mt-5">
              <div className="rounded-xl bg-blue-950 text-white p-3 text-center">
                <p className="text-2xl font-bold">{provider.valorExcedente < 0 ? 0 : formatMoney({ value: provider.valorExcedente, fractionDigits: 2 })}</p>
                <p className="text-xs uppercase">Total de excedentes</p>
              </div>
              <div className="rounded-xl bg-blue-950 text-white p-3 text-center">
                <p className="text-2xl font-bold">{provider.valorACobrar <= provider.plano.price
                  ? formatMoney({ value: provider.plano.price, fractionDigits: 2 })
                  : formatMoney({ value: provider.valorACobrar, fractionDigits: 2 })
                }</p>
                <p className="text-xs uppercase">Total a Cobrar</p>
              </div>
            </div>
          </section>
        </div>

        {/* Clientes e DIDs */}
        <section>
          <div className="mb-2">
            <h2 className="text-xl font-bold text-black mb-4">Clientes e DIDs</h2>
            <button
              onClick={() => navigate(`/provedor/${id}/novocliente`)}
              className="rounded-full text-white bg-blue-950 hover:bg-blue-900 disabled:opacity-60 p-2 mt-2 transition-colors border-2 border-amber-700"
            >
              Cadastrar novo Cliente
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse border-2 border-amber-700">
              <thead className="bg-blue-950 text-white uppercase text-xs">
                <tr>
                  <th className="p-3 border border-amber-700">Nome do cliente</th>
                  <th className="p-3 border border-amber-700">CPF ou CNPJ</th>
                  <th className="p-3 border border-amber-700">Telefone</th>
                  <th className="p-3 border border-amber-700">Data de cadastro</th>
                  <th className="p-3 border border-amber-700 text-center">DIDs</th>
                  <th className="p-3 border border-amber-700 text-center">Total de canais</th>
                </tr>
              </thead>
              <tbody>
                {provider.clients.length === 0 ? (
                  <tr>
                    <td colSpan={6} className="p-4 text-center text-gray-500">
                      Este provedor ainda não possui clientes.
                    </td>
                  </tr>
                ) : (
                  provider.clients.map((c) => {
                    const { totalDids, totalCanais } = totaisDoClienteFinal(c.dids);
                    return (
                      <tr key={c.id} className="hover:bg-amber-50">
                        <td className="p-3 border border-amber-700">{c.razaosocial}</td>
                        <td className="p-3 border border-amber-700">{c.cnpjCpf}</td>
                        <td className="p-3 border border-amber-700">{c.phone}</td>
                        <td className="p-3 border border-amber-700">{dateFomart(c.dataCadastro)}</td>
                        <td className="p-3 border border-amber-700 text-center">{totalDids}</td>
                        <td className="p-3 border border-amber-700 text-center">{totalCanais}</td>
                      </tr>
                    );
                  })
                )}
              </tbody>
            </table>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}