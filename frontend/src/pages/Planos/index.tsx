import useFetchPlans from "../../hooks/Planos/Plans";
import Spinner from "../../components/ui/effects/Spinner";
import axios from "axios";
import { LoginRediretion } from "../../services/LoginRediretion";
import { Header } from "../../components/layoout/Header";
import { Footer } from "../../components/layoout/Footer";
import { useMoneyInput } from "../../hooks/useMoneyInput";


export const Planos = () => {
  const { plans, loading, error } = useFetchPlans();
  //const { value, onChange } = useMoneyInput();

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
      <Header />
      <main className="w-full bg-white text-black p-16">
        <div className="flex gap-8 items-start justify-center flex-wrap">
          <div className="w-150 bg-white rounded-2xl border border-gray-200 shadow-md p-8">
            <h1 className="text-2xl font-bold text-center text-black mb-6">Planos criados</h1>
            <table className="w-full text-left border-collapse border-2 border-amber-700">
              <thead className="bg-blue-950 text-white font-bold uppercase text-xs">
                <tr>
                  <th className="p-3 border border-amber-700">Plano</th>
                  <th className="p-3 border border-amber-700">Preço</th>
                  <th className="p-3 border border-amber-700">Max. de DIDs</th>
                </tr>
              </thead>
              <tbody>
                {plans.map((plan) => (
                  <tr key={plan.id}>
                    <td className="p-3 border border-amber-700">{plan.name}</td>
                    <td className="p-3 border border-amber-700">R$ {plan.price}</td>
                    <td className="p-3 border border-amber-700">{plan.totalDids}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="w-150 bg-white rounded-2xl border border-gray-200 shadow-md p-8">
            <h2 className="text-2xl font-bold text-black text-center mb-6">Cadastrar plano Novo</h2>
            {/* no form: troque text-gray-700 por text-black nas <label> */}
          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}
