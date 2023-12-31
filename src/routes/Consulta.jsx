import { useState } from 'react';
import { useListaCadastro } from '../context/ListaCadastroContext';
import { Navigate} from 'react-router-dom';

export default function Consulta() {

  const { selectedSensor, setSelectedSensor, nomeLogin, setNomeLogin, usuarios, setUsuarios } = useListaCadastro();
  const [errorMessage, setErrorMessage] = useState('');
  const [sensoresFiltrados, SetSensoresFiltrados] = useState(selectedSensor);

  function returnDataFormat(x) {
    let [year, month, day] = x.split('-');
    return `${day}/${month}/${year}`;
  }

  function returnNomeSensor(x) {
    if (x === 'decibelimetro') {
      return "Decibelímetro"
    } else if (x === 'celulaCarga') {
      return "Célula de carga"
    } else if (x === 'sensorDistancia') {
      return "Sensor de distância"
    } else if (x === 'sensorPressao') {
      return "Sensor de pressão"
    } else if (x === 'acelerometro') {
      return "Acelerômetro"
    } else if (x === 'extensometro') {
      return "Extensômetro"
    } else if (x === 'sensorTemperatura') {
      return "Sensor de temperatura"
    }
  }

  function consultarSensor(event){
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    if (
      formData.get('sensorId') !== '' || 
      formData.get('nomePessoa') !== '' ||
      formData.get('dataInicio') !== '' ||
      formData.get('dataTermino') !== '' ||
      formData.get('dropdownTipoSensor') !== ''
    ) {

      let id = formData.get('sensorId');
      let nome = formData.get('nomePessoa');
      let dateInicio = formData.get('dataInicio');
      let dateTermino = formData.get('dataTermino');
      let sensorTipo = formData.get('dropdownTipoSensor')
      
      const filterData = () => {
      const filtered = selectedSensor.filter((item) => {
      const itemDate = item.data;
      const start = dateInicio !== '' ? dateInicio : null;
      const end = dateTermino !== '' ? dateTermino : null;
      return (
          (id ? item.id === id : true) &&
          (nome ? item.nomePessoa.toLowerCase().includes(nome.toLowerCase()) : true) &&
          (sensorTipo ? item.tipoSensor === sensorTipo : true) &&
          (start ? itemDate >= start : true) &&
          (end ? itemDate <= end : true)
          );
        });
      return filtered;
      };

      SetSensoresFiltrados(filterData())
      
      // resetando o form e apagando mensagens de erro antigas
      setErrorMessage('');
      form.reset()
      
    } else {
      SetSensoresFiltrados(selectedSensor)
      //setErrorMessage('Preencha algum dos campos!');
    }
  }

  return (
    <>
    <div className='flex justify-center items-center'>
    <form method="get" className="rounded-xl text-lg bg-gray-100 w-4/6 border-4 mt-10 border-sky-950 strong-shadow pl-6 pr-6 pb-6 pt-4" onSubmit={consultarSensor}>
        
        <div className='grid grid-cols-6 gap-4'>
          <div>
            <label htmlFor="sensorId" className="block text-black-600"><strong>ID</strong></label>
            <input
                className="mt-1 block w-full rounded border border-gray-300 p-1.5 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
                name="sensorId"
                id="sensorId"
                placeholder="Sensor ID"
                maxLength="5"
            />
          </div>
        
          <div className='col-span-5'>
            <label className="block text-black-600"><strong>Usuário</strong></label>
            <input
                className="mt-1 block w-full rounded border border-gray-300 p-1.5 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
                id="nomePessoa"
                name="nomePessoa"
                placeholder='Nome usuário'
              />
          </div>

        </div> 
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-black-600 mt-3"><strong>Tipo do sensor</strong></label>
          <select
            className="mt-1 block w-full rounded border border-gray-300 p-1.5 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
            id="dropdownTipoSensor"
            name="dropdownTipoSensor"
          >
            <option value="">Escolha um tipo de sensor...</option>
            <option value="celulaCarga">Célula de carga</option>
            <option value="sensorDistancia">Sensor de distância</option>
            <option value="sensorPressao">Sensor de pressão</option>
            <option value="decibelimetro">Decibelímetro</option>
            <option value="acelerometro">Acelerômetro</option>
            <option value="extensometro">Extensômetro</option>
            <option value="sensorTemperatura">Sensor de temperatura</option>
          </select>
        </div>
        <div>
        <label className="block text-black-600 mt-3"><strong>Data Início</strong></label>
        <input
            type="date"
            className="mt-1 block w-full rounded border border-gray-300 p-1.5 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
            id="dataInicio"
            name="dataInicio"
        />
        </div>
       <div>
        <label className="block text-black-600 mt-3"><strong>Data Fim</strong></label>
        <input
            type="date"
            className="mt-1 block w-full rounded border border-gray-300 p-1.5 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
            id="dataTermino"
            name="dataTermino"
            />
                </div>
                </div>

      {!!errorMessage && (
            <div className="mt-1 font-semibold text-red-500">
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
      {sensoresFiltrados.length === 0 ? (
        <div className="text-center text-black italic text-lg mt-5"><strong>Nenhum sensor encontrado.</strong></div>
      ) : (
        sensoresFiltrados.map(sensor => (
          <div key={sensor.id} className="bg-white rounded-lg overflow-hidden my-4 border-4 border-sky-950 strong-shadow">
            <div className="p-5 border-b font-semibold text-black border-gray-200">
              <h3 className="text-lg">ID: {sensor.id}</h3>
              <p className="">Usuário: {sensor.nomePessoa}</p>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <p className="text-black"><span className="font-semibold">Tipo do sensor:</span> {returnNomeSensor(sensor.tipoSensor)}.</p>
                  <p className="text-black"><span className="font-semibold">Data:</span> {returnDataFormat(sensor.data)}</p>
                </div>
                <div>
                  <p className="text-black"><span className="font-semibold">Ordem da Tendência:</span> {sensor.ordemTendencia}</p>
                  <p className="text-black"><span className="font-semibold">R²:</span> {sensor.r2}</p>
                </div>
              </div>
              <p className="text-black pt-3"><span className="font-semibold">Equação de Calibração:</span> {sensor.equacaoCalibracao}</p>
              <p className="text-black break-words"><span className="font-semibold">Descrição:</span> {sensor.descricao}.</p>
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