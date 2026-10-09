import { useParams } from "react-router-dom";
import { useFetchProvider } from "../../../hooks/Provedores/Provetores"
import { Header } from "../../../components/layoout/Header";
import { Footer } from "../../../components/layoout/Footer";


export const ProviderDetails = () => {
  const { id } = useParams();
  const idNumber = Number(id);
  const { provider, loading, error } = useFetchProvider(idNumber);

  if (loading) return <div><h1>Carregando</h1></div>

  if (error) {
    return <div>Error</div>
  }

  if (!provider) return <div>Provedor não existe</div>
  return (
    <>
      <Header />
      <main>
        <div>
          <h1>Detalhes do provedor</h1>
        </div>
        <div>
          {provider.razaosocial}
        </div>
      </main>
      <Footer />
    </>
  )
}