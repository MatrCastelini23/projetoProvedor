import { useParams } from "react-router-dom";
import { useFetchProvider } from "../../../hooks/Provedores/Provetores"
import Spinner from "../../../components/ui/effects/Spinner";
import axios from "axios";
import { LoginRediretion } from "../../../services/LoginRediretion";
import { Header } from "../../../components/layoout/Header";
import { Footer } from "../../../components/layoout/Footer";
import { MessageNull } from "../../../components/ui/Message/MessageNull";

export const ProviderDetails = () => {
  const { id } = useParams();
  const idNumber = Number(id);
  const { provider, loading, error } = useFetchProvider(idNumber);

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
        <div className="rounded-2xl border-2 border-amber-700 p-6 text-black">
          {provider.razaosocial}
        </div>
      </main>
      <Footer />
    </div>
  )
}