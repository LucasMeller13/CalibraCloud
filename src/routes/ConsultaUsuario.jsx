import { useState, useEffect } from 'react';
import { useListaCadastro, generateId } from '../context/ListaCadastroContext';
import { Navigate} from 'react-router-dom';

export default function ConsultaUsuario() {
    const { selectedSensor, setSelectedSensor, nomeLogin, setNomeLogin, usuarios, setUsuarios } = useListaCadastro();
    const [usuariosSelecionados, setUsuariosSelecionados] = useState(usuarios)
    const [errorMessage, setErrorMessage] = useState('');
    const [messageMood, setMessageMood] = useState(false);

    function returnDataFormat(x) {
        let [year, month, day] = x.split('-');
    return `${day}/${month}/${year}`;
    }
    
    function consultarUsuario(event) {
        event.preventDefault();
        const form = event.currentTarget;
        const formData = new FormData(form);
        if (
            formData.get('nomePessoa') !== '' || 
            formData.get('dataInicio') !== '' ||
            formData.get('dataTermino') !== ''
        ) {
            let nome = formData.get('nomePessoa');
            let dateInicio = formData.get('dataInicio');
            let dateTermino = formData.get('dataTermino');

            const filterData = () => {
            const filtered = usuarios.filter((item) => {
            const itemDate = item.dataCadastro;
            const start = dateInicio !== '' ? dateInicio : null;
            const end = dateTermino !== '' ? dateTermino : null;
            return (
                (nome ? item.nomePessoa.toLowerCase().includes(nome.toLowerCase()) : true) &&
                (start ? itemDate >= start : true) &&
                (end ? itemDate <= end : true)
                );
                });
            return filtered;
            };

            setUsuariosSelecionados(filterData())
            form.reset();
        } else {
            setUsuariosSelecionados(usuarios)
        }
        
    }

    return (
        <>
        <div className='flex justify-center items-center'>
                <form className='mt-10 rounded-xl text-lg bg-gray-100 w-3/6 pl-6 pr-6 pb-6 pt-4 border-4 border-sky-950 strong-shadow'
                    method="get"
                    onSubmit={consultarUsuario}
                    >
                <div className='grid grid-cols-4 gap-4'>
                    <div className='col-span-2'>
                        <label className="block text-black-600"><strong>Usuário</strong></label>
                        <input
                            className="mt-1 block w-full rounded border border-gray-300 p-1.5 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
                            id="nomePessoa"
                            name="nomePessoa"
                            placeholder='Nome usuário'
                        />
                    </div>
                    
                    <div className='col-span-1'>
                        <label className="block text-black-600"><strong>Data Início</strong></label>
                        <input
                            type="date"
                            className="mt-1 block w-full rounded border border-gray-300 p-1.5 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
                            id="dataInicio"
                            name="dataInicio"
                            />
                    </div>
                    <div className='col-span-1'>
                        <label className="block text-black-600"><strong>Data Fim</strong></label>
                        <input
                            type="date"
                            className="mt-1 block w-full rounded border border-gray-300 p-1.5 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
                            id="dataTermino"
                            name="dataTermino"
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
                Consultar
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
                        <p className="text-black"><span className="font-semibold">Data de Cadastro:</span> {returnDataFormat(item.dataCadastro)}</p>
                        <p className="text-black"><span className="font-semibold">Descrição:</span> {item.descricaoPessoa}.</p>
                </div>
            </div>
            ))
        )}
            </div>
            {nomeLogin == null ?
                    <Navigate replace to="/" />
                    : null }
        </>
    );
}