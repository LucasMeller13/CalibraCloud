import { useState } from 'react';
import { useListaCadastro } from '../context/ListaCadastroContext';
import { Navigate} from 'react-router-dom';

export default function Login() {
    const { selectedSensor, setSelectedSensor, nomeLogin, setNomeLogin } = useListaCadastro();
    const [errorMessage, setErrorMessage] = useState('');
    const [messageMood, setMessageMood] = useState(false);


    function validateLogin(event) {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);

        if (
        formData.get('login') !== '' &&
        formData.get('senha') !== '' &&
        !formData.get('login').includes(' ')
        ) {
        
        //setNomeLogin(formData.get('login'))
        form.reset();
        setNomeLogin(formData.get('login').toLowerCase())
        console.log(nomeLogin)
            
        } else {
            if (formData.get('login').includes(' ')) {
                setMessageMood(false)
                setErrorMessage('Login usuário não pode ter espaços!');
            } else {
                setMessageMood(false)
                setErrorMessage('Preencha todos os campos!');
            }
      }
        
    }
    
    return (
        <div className='flex items-center justify-center'>
            <form method="get" className="rounded-xl text-lg mt-44 bg-gray-100 w-1/4 p-10 border-4 border-sky-950 strong-shadow" onSubmit={validateLogin}>
        
                <label htmlFor="login" className="block text-black-600 text-xl"><strong>Login</strong></label>
                <input
                    className={'mt-1 block w-full rounded border border-gray-300 p-1.5 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50'}
                    name="login"
                    id="login"
                    placeholder="Nome usuário"
                        />
                        
                <label htmlFor="senha" className="block text-black-600 text-xl mt-4"><strong>Senha</strong></label>
                <input
                    className={'mt-1 block w-full rounded border border-gray-300 p-1.5 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50'}
                    name="senha"
                    id="senha"
                    placeholder="Senha"
                    type='password'
                />

                {!!errorMessage && (
                <div className="mt-1 font-semibold"
                style={{ color: messageMood ? 'green' : 'red' }}>
                {errorMessage}
                </div>
                )}

                {nomeLogin !== null ?
                    <Navigate replace to="/root/dashboard" />
                    : null }
                

                <div className='flex justify-end'>
                    <button
                    type="submit"
                    className="rounded bg-cyan-300 px-6 py-2 text-black font-semibold rounded-lg border-2 border-black hover:bg-cyan-400 mt-5
                                transition ease-in-out delay-50 hover:-translate-y-0.5"
                    >
                    Login
                    </button>
                </div>
            </form>
        </div>
    )
}