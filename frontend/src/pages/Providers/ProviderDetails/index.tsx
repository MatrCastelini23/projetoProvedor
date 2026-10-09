import { useParams } from "react-router-dom";
import { useFetchProvider } from "../../../hooks/Provedores/Provetores"
import { Header } from "../../../components/layoout/Header";
import { Footer } from "../../../components/layoout/Footer";

export const ProviderDetails = () => {
  const { id } = useParams();
  const idNumber = Number(id);
  const { provider, loading, error } = useFetchProvider(idNumber);

  if (loading) return <div><h1>Carregando</h1></div>
  if (error) return <div>Error</div>
  if (!provider) return <div>Provedor não existe</div>

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Header />
      <main className="flex-1 max-w-6xl w-full mx-auto px-4 py-10">
        <h1 className="text-2xl font-bold text-black mb-6">Detalhes do provedor</h1>
        <div className="rounded-2xl border-2 border-amber-700 p-6 text-black">
          {provider.razaosocial}
        </div>
      </main>
      <Footer />
    </div>
  )
}