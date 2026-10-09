import { Header } from "../../components/layoout/Header"
import { Footer } from "../../components/layoout/Footer"
import { useFetchProviders } from "../../hooks/Provedores/Provetores"
import { useNavigate } from "react-router-dom";

export const Provedores = () => {
  const { providers, loading, error } = useFetchProviders();
  const navigate = useNavigate();
  if (loading) return <div>Carregando</div>

  if (error) return (<div>Error: error</div>)

  if (!providers) return <div>Sempre provedores</div>
  return (
    <>
      <Header />
      <main>
        <section>
          <div>
            <h1>Painel de Provedores</h1>
          </div>
          <div>
            <table>
              <thead>
                <tr>
                  <th>Provedor</th>
                  <th>Plano</th>
                  <th>Número de clientes</th>
                  <th>Ir para o perfil</th>
                </tr>
              </thead>
              <tbody>
                {providers.map((p) => (
                  <tr key={p.id}>
                    <td>{p.razaosocial}</td>
                    <td>{p.plan_id}</td>
                    <td>Clientes</td>
                    <td>
                      <button
                        onClick={() => navigate(`/provedor/${p.id}`)}
                      >
                        Ver Perfil
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}

