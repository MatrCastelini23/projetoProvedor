import { useForm, type SubmitHandler } from 'react-hook-form'
import { Logar, type ILoginCredentials } from '../../api/Users/User';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm<ILoginCredentials>();
  const navigate = useNavigate();


  const onSubmit: SubmitHandler<ILoginCredentials> = async (data) => {
    try {
      const token = await Logar(data);
      localStorage.setItem('token', token.token);
      navigate("/");
    } catch (error) {
      if (axios.isAxiosError(error) && error.response) {
        const status = error.response.status;
        if (status === 401 || status === 403 || status === 404) {
          alert("Credenciais Erradas");
        } else {
          alert("Erro no servidor, tente novamente mais tarde");
        }
      } else {
        alert("Erro ao conectar com o servidor");
      }
    };
  };

  return (
    <>
      <main className="flex-1 bg-gray-50 flex items-center justify-center px-4">
        <div className="container max-w-md w-full bg-white rounded-2xl shadow-md p-8">
          <h2 className="text-2xl font-bold text-blue-950 text-center mb-6">Login</h2>

          <form className="flex flex-col gap-4" onSubmit={handleSubmit(onSubmit)}>
            <div className="flex flex-col gap-1">
              <label htmlFor="email" className="text-sm font-medium text-gray-700">
                Email:
              </label>
              <input
                type="email"
                id="email"
                {...register('email', { required: "Email obrigatório" })}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">{errors.email.message}</span>
              )}
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="password" className="text-sm font-medium text-gray-700">
                Senha:
              </label>
              <input
                type="password"
                id="password"
                {...register('password', { required: "Senha é obrigatório" })}
                className="border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-500"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">{errors.password.message}</span>
              )}
            </div>

            <button
              className="rounded-full text-xl text-white bg-blue-950 hover:bg-blue-900 p-2 mt-2 transition-colors border-2 border-orange-500"
              type="submit"
            >
              Logar
            </button>
          </form>
        </div>
      </main>
    </>
  )
}

export default Login