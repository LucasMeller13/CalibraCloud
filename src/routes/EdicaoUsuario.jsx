import { useState, useEffect } from 'react';
import { useListaCadastro, generateId } from '../context/ListaCadastroContext';
import { Navigate} from 'react-router-dom';

export default function EdicaoUsuario() {
    const { selectedSensor, setSelectedSensor, nomeLogin, setNomeLogin, usuarios, setUsuarios } = useListaCadastro();
    const [errorMessage, setErrorMessage] = useState('');
    const [messageMood, setMessageMood] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const [isValidUsuario, setIsValidUsuario] = useState(false);

    const [descricaoPessoaInput, setDescricaoPessoaInput] = useState('')
    const [dataCalibracaoInput, setDataCalibracaoInput] = useState('')

    function checkUsuario(event) {
    const usuarioInput = (event.target.value).toLowerCase();
    const usuarioPresente = usuarios.some(usuario => usuario.nomePessoa === usuarioInput);
    setErrorMessage('');
    setIsValidUsuario(usuarioPresente);

    if (usuarioPresente) {
        const usuarioEncontrado = usuarios.find(usuario => usuario.nomePessoa === usuarioInput);
        setIsDisabled(false);
        
        //setNomePessoaInput(usuarioEncontrado.nomePessoa)
        setDescricaoPessoaInput(usuarioEncontrado.descricaoPessoa)
        setDataCalibracaoInput(usuarioEncontrado.dataCadastro)
    } else {
        setIsDisabled(true);
        //setNomePessoaInput('')
        setDescricaoPessoaInput('')
        setDataCalibracaoInput('')
    }
    }
    

    function atualizarUsuario(event) {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);

        const confirmacaoEdicaoUser = window.confirm(`Tem certeza que deseja atualizar o usuário ${formData.get('nomePessoa')}?`);

        console.log(usuarios)

        if (confirmacaoEdicaoUser) {
            if (
                formData.get('nomePessoa') !== '' &&
                formData.get('descricaoPessoa') !== '' &&
                formData.get('dataCadastro') !== ''
            ) {

                const nomeTemp = formData.get('nomePessoa').toLowerCase()

                setUsuarios(usuarios.map(usuario => {
                if (usuario.nomePessoa === nomeTemp) {
                    return {
                        id: usuario.id,
                        nomePessoa: nomeTemp,
                        descricaoPessoa: formData.get('descricaoPessoa'),
                        dataCadastro: formData.get('dataCadastro')
                    }
                    }
                return usuario;
                }));

                form.reset();
                setMessageMood(true);
                setErrorMessage('Edição feita!');

            } else {
                setMessageMood(false)
                setErrorMessage('Preencha todos os campos!')
            }
            form.reset();
        }else {
            setMessageMood(false)
            setErrorMessage('Edição cancelada pelo usuário.')
        }


    }


    return (
        <>
            <div className='flex justify-center items-center'>
            <form className='mt-10 rounded-xl text-lg bg-gray-100 w-5/6 pl-6 pr-6 pb-6 pt-4 border-4 border-sky-950 strong-shadow'
                    method="get"
                    onSubmit={atualizarUsuario}
                >
                
                <div className='grid grid-cols-6 gap-4'>
                    <div className='col-span-1'>
                        <label className="block text-black-600"><strong>Usuário</strong></label>
                        <input
                        className={`mt-1 block w-full rounded-lg border-2 p-1.5 ${
                                isValidUsuario ? 'border-green-500 bg-green-100 focus:ring-2 focus:ring-green-500' : 'border-red-500 bg-red-100 focus:ring-2 focus:ring-red-500'
                                }`}
                                id="nomePessoa"
                                name="nomePessoa"
                                placeholder='Usuário'
                                onChange={checkUsuario}
                            />
                    </div>

                    <div className='col-span-1'>
                        <h3 className=''><strong>Data de cadastro:</strong> </h3>
                        <input
                            className="mt-1 block w-full rounded border border-gray-300 p-1.5 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
                                disabled={isDisabled}
                                type="date"
                                id="dataCadastro"
                                name="dataCadastro"
                                onChange={(e) => setDataCalibracaoInput(e.target.value)}
                                value={dataCalibracaoInput}
                            ></input>
                        </div>

                    <div className='col-span-4'>
                        <label className="block text-black-600"><strong>Descrição</strong></label>
                        <input
                        className="mt-1 block w-full rounded border border-gray-300 p-1.5 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
                                id="descricaoPessoa"
                                disabled={isDisabled}
                                value={descricaoPessoaInput}
                                onChange={(e) => setDescricaoPessoaInput(e.target.value)}
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
                    Editar
                    </button>
                </div>

            </form>
        </div>
        {nomeLogin == null ?
                            <Navigate replace to="/" />
                            : null }
        </>
    );
}