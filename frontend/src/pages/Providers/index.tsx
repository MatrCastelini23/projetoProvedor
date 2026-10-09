import { Header } from "../../components/layoout/Header"
import { Footer } from "../../components/layoout/Footer"
import { useFetchProviders } from "../../hooks/Provedores/Provetores"
import { useNavigate } from "react-router-dom";

export const Provedores = () => {
  const { providers, loading, error } = useFetchProviders();
  const navigate = useNavigate();

  if (loading) return <div>Carregando</div>
  if (error) return <div>Error: {String(error)}</div>
  if (!providers) return <div>Sem provedores</div>

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Header />
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-10">
        <section>
          <h1 className="text-2xl font-bold text-black mb-6">Painel de Provedores</h1>

          <table className="w-full text-left border-collapse border-2 border-amber-700">
            <thead className="bg-blue-950 text-white uppercase text-xs">
              <tr>
                <th className="p-3 border border-amber-700">Provedor</th>
                <th className="p-3 border border-amber-700">Plano</th>
                <th className="p-3 border border-amber-700">Número de clientes</th>
                <th className="p-3 border border-amber-700">Ir para o perfil</th>
              </tr>
            </thead>
            <tbody>
              {providers.map((p) => (
                <tr key={p.id} className="hover:bg-amber-50">
                  <td className="p-3 border border-amber-700">{p.razaosocial}</td>
                  <td className="p-3 border border-amber-700">{p.plan_id}</td>
                  <td className="p-3 border border-amber-700">Clientes</td>
                  <td className="p-3 border border-amber-700">
                    <button
                      onClick={() => navigate(`/provedor/${p.id}`)}
                      className="rounded-full text-sm text-white bg-blue-950 hover:bg-blue-900 px-4 py-1 transition-colors border-2 border-amber-700"
                    >
                      Ver Perfil
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      </main>
      <Footer />
    </div>
  )
}