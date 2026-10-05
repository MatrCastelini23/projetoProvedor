import useFetchPlans from "../api/localhost/Plans";
import Spinner from "../components/ui/effects/Spinner";
import axios from "axios";
import { LoginRediretion } from "../services/LoginRediretion";
import { useMoneyInput } from "../hooks/useMoneyInput";


function Planos() {
  const { plans, loading, error } = useFetchPlans();
  const { value, onChange } = useMoneyInput();

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
  if (!plans || plans.length === 0) return <h1>Sem planos</h1>;



  if (!plans) return (
    <h1>Sem planos</h1>
  )
  return (
    <>
      <main className="w-full rounded-2xl p-16">
        <div className="flex gap-8 items-start justify-center flex-wrap">
          <div className="w-150 bg-white rounded-2xl shadow-md p-8">
            <h1 className="text-2xl font-bold text-center text-blue-950 mb-6">Planos criados</h1>
            <table className="w-full text-left">
              <thead className="bg-blue-950 text-mauve-100 font-bold uppercase text-xs">
                <tr>
                  <th className="p-3">Plano</th>
                  <th className="p-3">Preço</th>
                  <th className="p-3">Max. de DIDs</th>
                </tr>
              </thead>
              <tbody>
                {plans.map((plan) => (
                  <tr key={plan.id}>
                    <td className="p-3 border-1 border-gray-950">{plan.name}</td>
                    <td className="p-3 border-1 border-gray-950">R$ {plan.price}</td>
                    <td className="p-3 border-1 border-gray-950">{plan.totalDids}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="w-150 bg-white rounded-2xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-blue-950 text-center mb-6">Cadastrar plano Novo</h2>

            <form className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="name" className="text-sm font-medium text-gray-700">
                  Nome:
                </label>
                <input
                  type="name"
                  id="name"
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="description" className="text-sm font-medium text-gray-700">
                  Descrição:
                </label>
                <input
                  type="text"
                  id="description"
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="price" className="text-sm font-medium text-gray-700">
                  Preço R$:
                </label>
                <input
                  type="text"
                  id="price"
                  value={value}
                  onChange={onChange}
                  inputMode="numeric"
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <div className="flex flex-col gap-1">
                <label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Total de Dids:
                </label>
                <input
                  type="password"
                  id="password"
                  className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
                />
              </div>

              <button
                className="rounded-full text-xl text-white bg-blue-950 hover:bg-blue-900 p-2 mt-2 transition-colors border-2 border-orange-500"
                type="submit"
              >
                Cadastrar
              </button>
            </form>
          </div>
        </div>
      </main >
    </>
  )
}

export default Planos;