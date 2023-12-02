import { useState, useEffect } from 'react';
import { useListaCadastro, generateId } from '../context/ListaCadastroContext';

export default function RemocaoUsuario() {
    const { selectedSensor, setSelectedSensor, nomeLogin, setNomeLogin, usuarios, setUsuarios } = useListaCadastro();
    const [errorMessage, setErrorMessage] = useState('');
    const [usuariosSelecionados, setUsuariosSelecionados] = useState(usuarios)
    const [messageMood, setMessageMood] = useState(false);
    const [isDisabled, setIsDisabled] = useState(true);
    const [isValidUsuario, setIsValidUsuario] = useState(false);

    function checkUsuario(event) {
    const usuarioInput = (event.target.value).toLowerCase();
    const usuarioPresente = usuarios.some(usuario => usuario.nomePessoa === usuarioInput);
    setErrorMessage('');
    setIsValidUsuario(usuarioPresente);

    if (usuarioPresente) {
        const usuarioEncontrado = usuarios.find(usuario => usuario.nomePessoa === usuarioInput);
        setUsuariosSelecionados([usuarioEncontrado])
    } else {
        setIsDisabled(true);
        setUsuariosSelecionados(usuarios)
    }
    }

    function removerSensor(event){
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    if (
      formData.get('nomePessoa') !== '' &&
        isValidUsuario &&
        (formData.get('nomePessoa')).toLowerCase() !== nomeLogin
    ) {
        

      let nomePessoa = formData.get('nomePessoa');

      const confirmacaoEdicaoUser = window.confirm(`Tem certeza que deseja remover o usuário (${nomePessoa}) do banco de dados?`);

      if (confirmacaoEdicaoUser) {
        setUsuarios(usuarios.filter(usuario => usuario.nomePessoa !== nomePessoa))
        setUsuariosSelecionados(usuarios)
        setMessageMood(true)
        setErrorMessage(`Usuário (${nomePessoa}) removido com sucesso!`)
      } else {
        setMessageMood(false)
        setErrorMessage(`Remoção impedida do usuário (${nomePessoa}).`)
        setUsuariosSelecionados(usuarios)
      }

      form.reset();
      
    } else {
        if ((formData.get('nomePessoa')).toLowerCase() == nomeLogin) {
            setMessageMood(false)
            setErrorMessage('Não é possível excluir o seu próprio usuário')
        }
        setUsuariosSelecionados(usuarios)
        form.reset()
    }
  }

    return (
        <>
        <div className='flex justify-center items-center'>
                <form className='mt-10 rounded-xl text-lg bg-gray-100 w-2/6 pl-6 pr-6 pb-6 pt-4 border-4 border-sky-950 strong-shadow'
                    method="get"
                    onSubmit={removerSensor}
                    >
                    <div className=''>
                        <label className="block text-black-600"><strong>Usuário</strong></label>
                        <input
                            className={`mt-1 block w-full rounded-lg border-2 p-1.5 ${
                                isValidUsuario ? 'border-green-500 bg-green-100 focus:ring-2 focus:ring-green-500' : 'border-red-500 bg-red-100 focus:ring-2 focus:ring-red-500'
                                }`}
                            id="nomePessoa"
                            name="nomePessoa"
                            onChange={checkUsuario}
                            placeholder='Nome usuário'
                        />
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
                Remover
                </button>
                </div>
            </form>
        </div>

        <div className="max-w-4xl mx-auto p-5">
        {usuariosSelecionados.length === 0 ? (
            <div className="text-center text-black italic text-lg mt-5">
            <strong>Nenhum usuário encontrado.</strong>
            </div>
        ) : (
            usuariosSelecionados.map(item => (
            <div key={item.id} className="bg-white rounded-lg overflow-hidden my-4 border-4 border-sky-950 strong-shadow">
                <div className="p-5 border-b font-semibold text-black border-gray-200">
                <h3 className="text-lg">Usuário: {item.nomePessoa}</h3>
                </div>
                    <div className="p-5">
                        <p className="text-black"><span className="font-semibold">Data de Cadastro:</span> {(item.dataCadastro)}</p>
                        <p className="text-black"><span className="font-semibold">Descrição:</span> {item.descricaoPessoa}.</p>
                </div>
            </div>
            ))
        )}
        </div>
        </>
    );
}