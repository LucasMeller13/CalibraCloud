import { useState, useEffect } from 'react';
import { useListaCadastro, generateId } from '../context/ListaCadastroContext';

export default function CadastroUsuario() {
    const {selectedSensor, setSelectedSensor, nomeLogin, setNomeLogin, usuarios, setUsuarios} = useListaCadastro();
    const [errorMessage, setErrorMessage] = useState('');
    const [messageMood, setMessageMood] = useState(false);

    const todayDate = new Date();

    let dateJSX = todayDate.getFullYear() + "-" + parseInt(todayDate.getMonth()+1) + "-" + (+todayDate.getDate() > 10 ? todayDate.getDate() : '0' + todayDate.getDate())
    let date = todayDate.getDate() + "/"+ parseInt(todayDate.getMonth()+1) +"/"+todayDate.getFullYear();

    function checkUser(x){
        const usuarioPresente = usuarios.some(usuario => usuario.nomePessoa === x);
        return usuarioPresente
    }


    function cadastrarUsuario(event) {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);

        const confirmacaoEdicaoUser = window.confirm(`Tem certeza que deseja cadastrar o usuário ${formData.get('nomePessoa')}?`);

        console.log(usuarios)

        if (confirmacaoEdicaoUser) {
            if (
                formData.get('nomePessoa') !== '' &&
                formData.get('descricaoPessoa') !== '' &&
                !checkUser(formData.get('nomePessoa').toLowerCase())
            ) {

                const novoUsuario = {
                    id: usuarios.length + 1,
                    nomePessoa: formData.get('nomePessoa').toLowerCase(),
                    descricaoPessoa: formData.get('descricaoPessoa'),
                    dataCadastro: dateJSX
                };

                setUsuarios([...usuarios, novoUsuario])
                setMessageMood(true)
                setErrorMessage('Usuário cadastrado com sucesso!')

            } else {
                if (checkUser(formData.get('nomePessoa').toLowerCase())) {
                    setMessageMood(false)
                    setErrorMessage('Usuário já presente no banco de dados!')
                } else {
                    setMessageMood(false)
                    setErrorMessage('Preencha todos os campos!')
                }
            }
            form.reset();
        }


    }

    return (
        <div className='flex justify-center items-center'>
            <form className='mt-10 rounded-xl text-lg bg-gray-100 w-5/6 pl-6 pr-6 pb-6 pt-4 border-4 border-sky-950 strong-shadow'
                method="get"
                onSubmit={cadastrarUsuario}>
                
                <div className='grid grid-cols-6 gap-4'>
                    <div className='col-span-1'>
                        <label className="block text-black-600"><strong>Usuário</strong></label>
                        <input
                        className="mt-1 block w-full rounded border border-gray-300 p-1.5 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
                        id="nomePessoa"
                        name="nomePessoa"
                        placeholder='Usuário'
                            />
                    </div>

                    <div className='col-span-1'>
                        <h3 className=''><strong>Data de cadastro:</strong> </h3>
                        <input
                            className="mt-1 block w-full rounded border border-gray-300 p-1.5 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
                            disabled={true}
                            value={date}></input>
                        </div>

                    <div className='col-span-4'>
                        <label className="block text-black-600"><strong>Descrição</strong></label>
                        <input
                        className="mt-1 block w-full rounded border border-gray-300 p-1.5 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
                        id="descricaoPessoa"
                        name="descricaoPessoa"
                        placeholder='Laboratório que trabalha, com quais atividades participa, etc...'
                            />
                    </div>
                </div>

                {!!errorMessage && (
                <div className="mt-1 font-semibold"
                    style={{ color: messageMood ? 'green' : 'red' }}>
                    {errorMessage}
                </div>
                    )}

                <div className='flex justify-end'>
                    <button
                type="submit"
                className="rounded bg-cyan-300 px-6 py-2 text-black font-semibold rounded-lg border-2 border-black hover:bg-cyan-400 mt-5
                            transition ease-in-out delay-50 hover:-translate-y-0.5"
                    >
                    Cadastrar
                    </button>
                </div>

            </form>
        </div>
    );
}