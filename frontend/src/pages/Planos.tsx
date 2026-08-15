import useFetchPlans from "../api/localhost/Plans";
import Spinner from "../components/ui/effects/Spinner";
import axios from "axios";
import { LoginRediretion } from "../services/LoginRediretion";

function Planos() {
  const { plans, loading, error } = useFetchPlans();

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
      <div>
        <h1>Planos criados</h1>
        <table>
          <thead>
            <tr>
              <th>Plano</th>
              <th>Preço</th>
              <th>Maximo de DIDs</th>
            </tr>
          </thead>
          <tbody>
            {plans.map((plan) => (
              <tr key={plan.id}>
                <td>{plan.name}</td>
                <td>{plan.price}</td>
                <td>{plan.totalDids}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  )
}

export default Planos;