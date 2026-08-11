import { useForm } from 'react-hook-form'
import { Logar } from '../api/localhost/User';
import { useNavigate } from 'react-router-dom';

function Login() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();


  async function onSubmit(data: any) {
    const token = await Logar(data);

    localStorage.setItem("Token", token.data.token)
    navigate("/");
  }

  return (
    <>
      <div>
        <form onSubmit={handleSubmit(onSubmit)}>
          <h2>Login</h2>
          <label htmlFor="email">Email:</label>
          <input type="email" id='email'{...register('email', { required: "Email obrigatório" })} />
          <label htmlFor="password">Password:</label>
          <input type="text" id='password' {...register('password', { required: "Senha é obrigatório" })} />
          {errors.emaill && <span>Erro ao logar</span>}
          <button type='submit'>Logar:</button>
        </form>
      </div>
    </>
  )
}

export default Login