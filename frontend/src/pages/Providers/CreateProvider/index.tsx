import { Header } from "../../../components/layoout/Header"
import { Footer } from "../../../components/layoout/Footer"
import { useFetchPlans } from "../../../hooks/Planos/Plans"
import Spinner from "../../../components/ui/effects/Spinner"
import { MessageNull } from "../../../components/ui/Message/MessageNull"
import { useNavigate } from "react-router-dom"
import { useForm, type SubmitHandler } from "react-hook-form"
import axios from "axios"
import { createProvider, type IProvider } from "../../../api/Provedores/Provedores"

const inputClass = "border border-gray-300 rounded-lg px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-amber-700"
const labelClass = "text-sm font-medium text-black"
const errorClass = "text-red-500 text-sm"

export const CreateProvider = () => {
  const { plans, loading, error } = useFetchPlans();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<IProvider>({
    defaultValues: { razaosocial: "", email: "", phone: "", planoId: 0, cnpj: "" }
  })

  const onSubmit: SubmitHandler<IProvider> = async (data) => {
    try {
      await createProvider(data)
      alert("Provedor cadastrado")
      navigate("/provedores")
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 403) {
          alert("Sem permissão para cadastrar planos")
          navigate("/login")
        } else {
          alert("Erro no servidor, tente novamente mais tarde")
          navigate("/login")
        }
      } else {
        alert("Erro ao conectar com o servidor")
        navigate("/login")
      }
    }
  }

  if (loading) return <Spinner />

  if (error) return <MessageNull message="Erro ao buscar planos" />

  if (!plans) return <MessageNull message="Planos não cadastrados ainda" />


  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="max-w-md w-full bg-white rounded-2xl border-2 border-amber-700 shadow-md p-8">
          <h1 className="text-2xl font-bold text-black text-center mb-6">
            Cadastrar Novo Provedor
          </h1>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-1">
              <label htmlFor="razaosocial" className={labelClass}>Razao Social</label>
              <input
                id="razaosocial"
                className={inputClass}
                type="text"
                {...register("razaosocial", { required: "Razão Social é obrigatório" })}
              />
              {errors.razaosocial && <span className={errorClass}>{errors.razaosocial.message}</span>}
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="cnpj" className={labelClass}>CNPJ</label>
              <input
                id="cnpj"
                className={inputClass}
                type="text"
                {...register("cnpj", { required: "CNPJ é obrigatório" })}
              />
              {errors.cnpj && <span className={errorClass}>{errors.cnpj.message}</span>}
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className={labelClass}>E-mail</label>
              <input
                id="email"
                className={inputClass}
                type="text"
                {...register("email", { required: "E-mail é obrigatório" })}
              />
              {errors.email && <span className={errorClass}>{errors.email.message}</span>}
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="phone" className={labelClass}>Telefone</label>
              <input
                id="phone"
                className={inputClass}
                type="text"
                {...register("phone", { required: "Telefone é obrigatório" })}
              />
              {errors.phone && <span className={errorClass}>{errors.phone.message}</span>}
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="planoId" className={labelClass}>Plano</label>
              <select
                className={inputClass}
                id="planoId"
                {...register("planoId", {
                  required: "Plano é obrigatório",
                  valueAsNumber: true,
                  validate: (value) => value > 0 || "Selecione um plano",
                })}
              >
                <option value={0}>Selecione um plano</option>
                {plans.map((p) => (
                  <option key={p.id} value={p.id}>
                    {p.name}
                  </option>
                ))}
              </select>
              {errors.planoId && <span className={errorClass}>{errors.planoId.message}</span>}
            </div>
            <button
              type="submit"
              className="rounded-full text-xl text-white bg-blue-950 hover:bg-blue-900 disabled:opacity-60 p-2 mt-2 transition-colors border-2 border-amber-700"
            >
              {isSubmitting ? "Cadastrando" : "Cadastrar"}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}