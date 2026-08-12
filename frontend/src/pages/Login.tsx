import { useForm, type SubmitHandler } from 'react-hook-form'
import { Logar, type ILoginCredentials } from '../api/localhost/User';
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
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Login</h2>
          <label htmlFor="email">Email:</label>
          <input type="email" id='email'{...register('email', { required: "Email obrigatório" })} />
          {errors.email && <span>{errors.email.message}</span>}
          <label htmlFor="password">Password:</label>
          <input type="password" id='password' {...register('password', { required: "Senha é obrigatório" })} />
          {errors.password && <span>{errors.password.message}</span>}
          <button type='submit'>Logar:</button>
        </form>
      </div>
    </>
  )
}

export default Login