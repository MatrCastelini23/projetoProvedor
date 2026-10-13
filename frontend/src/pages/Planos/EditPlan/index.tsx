import { Header } from "../../../components/layoout/Header"
import { Footer } from "../../../components/layoout/Footer"
import { useNavigate, useParams } from "react-router-dom"
import { useForm, Controller, type SubmitHandler } from "react-hook-form"
import { alterPlan, type IPlan } from "../../../api/Planos/Plans"
import { formatMoney } from "../../../utils/formatMoney"
import axios from "axios"
import { useFetchPlan } from "../../../hooks/Planos/Plans"
import Spinner from "../../../components/ui/effects/Spinner"
import { MessageNull } from "../../../components/ui/Message/MessageNull"
import { useEffect } from "react"

const inputClass = "border border-gray-300 rounded-lg px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-amber-700"
const labelClass = "text-sm font-medium text-black"
const errorClass = "text-red-500 text-sm"

export const EditPlan = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const { plan, loading, error } = useFetchPlan(Number(id));

  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, dirtyFields },
  } = useForm<IPlan>({
    defaultValues: { name: "", description: "", price: 0, totalDids: 0, valorExcedente: 0 },
  })

  useEffect(() => {
    if (plan) {
      reset({
        ...plan,
        price: Number(plan.price),
        valorExcedente: Number(plan.valorExcedente),
        totalDids: Number(plan.totalDids),
      })
    }
  }, [plan, reset])
  const onSubmit: SubmitHandler<IPlan> = async (data) => {

    const changed = Object.fromEntries(
      Object.keys(dirtyFields).map((key) => [key, data[key as keyof IPlan]])
    ) as Partial<IPlan>

    if (changed.price !== undefined)
      changed.price = Number(Number(changed.price).toFixed(2))

    if (changed.valorExcedente !== undefined)
      changed.valorExcedente = Number(Number(changed.valorExcedente).toFixed(2))
    if (Object.keys(changed).length === 0) {
      alert("Nenhuma alteração para salvar")
      return
    }
    try {
      await alterPlan(Number(id), {
        ...data,
        price: Number(data.price.toFixed(2)),
      });
      navigate("/planos");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        if (error.response.status === 403) {
          alert("Erro de credencial")
          navigate("/login")
        }
      } else {
        alert(`Erro no servidor`)
      }
    }
  }

  if (loading) return <Spinner />

  if (error) return <MessageNull message="Erro ao encontrar plano" />

  if (!plan) return <MessageNull message="Plano não encontrado" />

  return (
    <div className="min-h-screen flex flex-col bg-white text-black">
      <Header />
      <main className="flex-1 flex items-center justify-center px-4 py-10">
        <div className="max-w-md w-full bg-white rounded-2xl border-2 border-amber-700 shadow-md p-8">
          <h1 className="text-2xl font-bold text-black text-center mb-6">
            Alterar plano
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

            <div className="flex flex-col gap-1">
              <label htmlFor="valorExcedente" className={labelClass}>Valor Excendente R$:</label>
              <Controller
                name="valorExcedente"
                control={control}
                rules={{ min: { value: 0.01, message: "Informe um valor maior que zero" } }}
                render={({ field }) => (
                  <input
                    type="text"
                    inputMode="numeric"
                    id="valorExcedente"
                    value={formatMoney({ value: field.value, fractionDigits: 2 })}
                    onChange={(e) =>
                      field.onChange(Number(e.target.value.replace(/\D/g, "")) / 100)
                    }
                    onBlur={field.onBlur}
                    className={inputClass}
                  />
                )}
              />
              {errors.valorExcedente && <span className={errorClass}>{errors.valorExcedente.message}</span>}
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="rounded-full text-xl text-white bg-blue-950 hover:bg-blue-900 disabled:opacity-60 p-2 mt-2 transition-colors border-2 border-amber-700"
            >
              {isSubmitting ? "Alterando..." : "Alterar"}
            </button>
          </form>
        </div>
      </main>
      <Footer />
    </div>
  )

}