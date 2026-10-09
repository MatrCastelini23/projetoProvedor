import { useNavigate } from "react-router-dom"
import { Header } from "../../components/layoout/Header"
import { Footer } from "../../components/layoout/Footer"

export const NoPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-md w-full text-center rounded-2xl border-2 border-amber-700 shadow-md p-10">
          <h1 className="text-8xl font-extrabold text-blue-950">404</h1>
          <h2 className="mt-4 text-2xl font-bold text-black">Página não encontrada</h2>
          <p className="mt-2 text-black/70">
            O endereço que você tentou acessar não existe. Navegue para outra página, por favor.
          </p>
          <button
            onClick={() => navigate("/")}
            className="mt-6 rounded-full text-lg text-white bg-blue-950 hover:bg-blue-900 px-6 py-2 transition-colors border-2 border-amber-700"
          >
            Voltar para o início
          </button>
        </div>
      </main>
      <Footer />
    </div>
  )
}