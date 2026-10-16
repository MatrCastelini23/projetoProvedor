import { Header } from "../../../components/layoout/Header"
import { Footer } from "../../../components/layoout/Footer"
import { useNavigate, useParams } from "react-router-dom"
import { useFieldArray, useForm, type SubmitHandler } from "react-hook-form";
import { createClient, type IProviderClient } from "../../../api/ProviderClient/ProviderClient";
import axios from "axios";

const inputClass = "border border-gray-300 rounded-lg px-3 py-2 text-black focus:outline-none focus:ring-2 focus:ring-amber-700"
const labelClass = "text-sm font-medium text-black"
const errorClass = "text-red-500 text-sm"

export const ProviderClients = () => {
  const { id } = useParams<{ id: string }>();
  const idNumber = Number(id);
  const navigate = useNavigate();


  const {
    register,
    handleSubmit,
    control,
    formState: { errors, isSubmitting },
  } = useForm<IProviderClient>({
    defaultValues: { razaosocial: "", cnpjCpf: "", email: "", phone: "", providerId: idNumber, dids: [] }
  })

  const { fields, append, remove } = useFieldArray({ control, name: "dids" });

  const addDid = () => append({
    dids: "",
    canais: 2,
    data_ativacao: "",
  })

  const onSubmit: SubmitHandler<IProviderClient> = async (data) => {
    try {
      await createClient(data);
      alert("Cliente Cadastrato com sucesso")
      navigate(`/provedor/${idNumber}`)
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
        <div className="bg-white rounded-2xl border-2 border-amber-700 shadow-md p-8">
          <h1 className="text-2xl font-bold text-black text-center mb-6">
            Cadastrar Cliente do Provedor
          </h1>
          <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-1">
              <label className={labelClass} htmlFor="razaosocial">Nome ou Razao Social</label>
              <input
                id="razaosocial"
                className={inputClass}
                type="text"
                {...register("razaosocial", { required: "Razão Social ou nome é obrigatório" })}
              />
              {errors.razaosocial && <span className={errorClass}>{errors.razaosocial.message}</span>}
            </div>
            <div className="flex flex-col gap-1">
              <label className={labelClass} htmlFor="cnpjCpf">CPF ou CNPJ</label>
              <input
                id="cnpjCpf"
                className={inputClass}
                type="text"
                {...register("cnpjCpf", { required: "CPF e Cnpj nome é obrigatório" })}
              />
              {errors.cnpjCpf && <span className={errorClass}>{errors.cnpjCpf.message}</span>}
            </div>
            <div className="flex flex-col gap-1">
              <label className={labelClass} htmlFor="email">Email</label>
              <input
                id="email"
                className={inputClass}
                type="text"
                {...register("email", { required: "E-mail é obrigatório" })}
              />
              {errors.email && <span className={errorClass}>{errors.email.message}</span>}
            </div>
            <div className="flex flex-col gap-1">
              <label className={labelClass} htmlFor="phone">Telefone</label>
              <input
                id="phone"
                className={inputClass}
                type="text"
                {...register("phone", { required: "E-mail é obrigatório" })}
              />
              {errors.phone && <span className={errorClass}>{errors.phone.message}</span>}
            </div>
            <div className="flex flex-col gap-3 border-t border-gray-200 pt-4">
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-black">
                  DIDs {fields.length > 0 && `(${fields.length})`}
                </h2>
                <button
                  type="button"
                  onClick={addDid}
                  className="rounded-full text-sm text-white bg-amber-700 hover:bg-amber-600 px-3 py-1 transition-colors"
                >
                  + Adicionar DID
                </button>
              </div>

              {fields.length === 0 && (
                <p className="text-sm text-gray-500">Nenhum DID adicionado (opcional).</p>
              )}

              {fields.map((field, index) => (
                <div key={field.id} className="flex flex-col gap-3 rounded-lg border border-gray-300 p-4">
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-medium text-black">DID {index + 1}</span>
                    <button
                      type="button"
                      onClick={() => remove(index)}
                      className="text-sm text-red-500 hover:text-red-700"
                    >
                      Remover
                    </button>
                  </div>

                  <div className="flex flex-col gap-1">
                    <label className={labelClass} htmlFor={`dids.${index}.dids`}>Número do DID</label>
                    <input
                      id={`dids.${index}.dids`}
                      className={inputClass}
                      type="text"
                      inputMode="numeric"
                      {...register(`dids.${index}.dids`, {
                        required: "Número do DID é obrigatório",
                        pattern: { value: /^\d{10,12}$/, message: "Use 10 ou 12 dígitos, só números" },
                      })}
                    />
                    {errors.dids?.[index]?.dids && (
                      <span className={errorClass}>{errors.dids[index]?.dids?.message}</span>
                    )}
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    <div className="flex flex-col gap-1">
                      <label className={labelClass} htmlFor={`dids.${index}.canais`}>Canais</label>
                      <input
                        id={`dids.${index}.canais`}
                        className={inputClass}
                        type="number"
                        min={1}
                        {...register(`dids.${index}.canais`, {
                          valueAsNumber: true,
                          required: "Informe os canais",
                          min: { value: 2, message: "Mínimo 1" },
                        })}
                      />
                      {errors.dids?.[index]?.canais && (
                        <span className={errorClass}>{errors.dids[index]?.canais?.message}</span>
                      )}
                    </div>

                    <div className="flex flex-col gap-1">
                      <label className={labelClass} htmlFor={`dids.${index}.data_ativacao`}>Data de ativação</label>
                      <input
                        id={`dids.${index}.data_ativacao`}
                        className={inputClass}
                        type="date"
                        {...register(`dids.${index}.data_ativacao`, { required: "Informe a data" })}
                      />
                      {errors.dids?.[index]?.data_ativacao && (
                        <span className={errorClass}>{errors.dids[index]?.data_ativacao?.message}</span>
                      )}
                    </div>
                  </div>
                </div>
              ))}
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