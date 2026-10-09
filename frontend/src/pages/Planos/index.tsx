import useFetchPlans from "../../hooks/Planos/Plans";
import Spinner from "../../components/ui/effects/Spinner";
import axios from "axios";
import { LoginRediretion } from "../../services/LoginRediretion";
import { Header } from "../../components/layoout/Header";
import { Footer } from "../../components/layoout/Footer";
import { useNavigate } from "react-router-dom";
import { CreatePlan } from "./CreatePlan";


export const Planos = () => {
  const { plans, loading, error } = useFetchPlans();
  const navigate = useNavigate();

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

  if (!plans || plans.length === 0) return <CreatePlan />;

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Header />
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-10">
        <div className="flex gap-8 items-start justify-center flex-wrap">
          <div className="w-150 bg-white rounded-2xl border border-gray-200 shadow-md p-8">
            <h1 className="text-2xl font-bold text-center text-black mb-6">Planos criados</h1>
            <table className="w-full text-left border-collapse border-2 border-amber-700">
              <thead className="bg-blue-950 text-white font-bold uppercase text-xs">
                <tr>
                  <th className="p-3 border border-amber-700">Plano</th>
                  <th className="p-3 border border-amber-700">Preço</th>
                  <th className="p-3 border border-amber-700">Max. de DIDs</th>
                  <th className="p-3 border border-amber-700">Valor Excendente a cobrar</th>
                  <th className="p-3 border border-amber-700">Editar</th>
                </tr>
              </thead>
              <tbody>
                {plans.map((plan) => (
                  <tr key={plan.id}>
                    <td className="p-3 border border-amber-700">{plan.name}</td>
                    <td className="p-3 border border-amber-700">R$ {plan.price}</td>
                    <td className="p-3 border border-amber-700">{plan.totalDids}</td>
                    <td className="p-3 border border-amber-700">{plan.valorExcedente}</td>
                    <td className="p-3 border border-amber-700">
                      <button
                        onClick={() => navigate(`/plano/${plan.id}`)}
                      >
                        Editar
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="flex justify-end mt-6">
              <button
                onClick={() => navigate("/cadastrarPlano")}
                className="rounded-full text-lg text-white bg-blue-950 hover:bg-blue-900 px-6 py-2 transition-colors border-2 border-amber-700"
              >
                Cadastrar Plano
              </button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}
