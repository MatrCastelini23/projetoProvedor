import { useForm, Controller, type SubmitHandler } from "react-hook-form"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { Header } from "../../../components/layoout/Header"
import { Footer } from "../../../components/layoout/Footer"
import { formatMoney } from "../../../utils/formatMoney"
import { createPlan, type ICreatePlan } from "../../../api/Planos/Plans"

const inputClass = "border border-gray-300 rounded-lg px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-amber-700"
const labelClass = "text-sm font-medium text-black"
const errorClass = "text-red-500 text-sm"

export const CreatePlan = () => {
  const navigate = useNavigate()
  const {
    register,
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ICreatePlan>({
    defaultValues: { name: "", description: "", price: 0, totalDids: 0 },
  })

  const onSubmit: SubmitHandler<ICreatePlan> = async (data) => {
    try {
      await createPlan({
        ...data,
        price: Number(data.price.toFixed(2)),
      })
      alert("Plano cadastrado")
      navigate("/planos")
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

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="max-w-md w-full bg-white rounded-2xl border-2 border-amber-700 shadow-md p-8">
          <h1 className="text-2xl font-bold text-black text-center mb-6">
            Cadastrar plano novo
          </h1>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-1">
              <label htmlFor="name" className={labelClass}>Nome:</label>
              <input
                type="text"
                id="name"
                {...register("name", { required: "Nome obrigatório" })}
                className={inputClass}
              />
              {errors.name && <span className={errorClass}>{errors.name.message}</span>}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="description" className={labelClass}>Descrição:</label>
              <input
                type="text"
                id="description"
                {...register("description", { required: "Descrição obrigatória" })}
                className={inputClass}
              />
              {errors.description && (
                <span className={errorClass}>{errors.description.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="price" className={labelClass}>Preço R$:</label>
              <Controller
                name="price"
                control={control}
                rules={{ min: { value: 0.01, message: "Informe um preço maior que zero" } }}
                render={({ field }) => (
                  <input
                    type="text"
                    inputMode="numeric"
                    id="price"
                    value={formatMoney({ value: field.value, fractionDigits: 2 })}
                    onChange={(e) =>
                      field.onChange(Number(e.target.value.replace(/\D/g, "")) / 100)
                    }
                    onBlur={field.onBlur}
                    className={inputClass}
                  />
                )}
              />
              {errors.price && <span className={errorClass}>{errors.price.message}</span>}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="totalDids" className={labelClass}>
                Máximo de DIDs sem acréscimo:
              </label>
              <input
                type="number"
                id="totalDids"
                {...register("totalDids", {
                  valueAsNumber: true,
                  required: "Informe o total de DIDs",
                  min: { value: 1, message: "Não pode ser menor que 1" },
                })}
                className={inputClass}
              />
              {errors.totalDids && (
                <span className={errorClass}>{errors.totalDids.message}</span>
              )}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full text-xl text-white bg-blue-950 hover:bg-blue-900 disabled:opacity-60 p-2 mt-2 transition-colors border-2 border-amber-700"
            >
              {isSubmitting ? "Cadastrando..." : "Cadastrar"}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )
}