import { Header } from "../../../components/layoout/Header"
import { Footer } from "../../../components/layoout/Footer"

export const CreateProvider = () => {

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="max-w-md w-full bg-white rounded-2xl border-2 border-amber-700 shadow-md p-8">
          <h1 className="text-2xl font-bold text-black text-center mb-6">
            Cadastrar Novo Provedor
          </h1>
        </div>
      </main>
      <Footer />
    </div>
  )
}