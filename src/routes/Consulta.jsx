import { useState } from 'react';
import { useListaCadastro} from '../context/ListaCadastroContext';

export default function Consulta() {

  const [selectedSensor, setSelectedSensor] = useListaCadastro();
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
      form.reset();
      setErrorMessage('');
      
    } else {
      SetSensoresFiltrados(selectedSensor)
      //setErrorMessage('Preencha algum dos campos!');
    }
  }

  return (
    <>
    <div>
    <form method="get" className="rounded bg-gray-100 p-3.5 shadow-2xl" onSubmit={consultarSensor}>
        
        <label htmlFor="sensorId" className="block text-black-600"><strong>ID</strong></label>
        <input
            className="mt-1 block w-full rounded border border-gray-300 p-1.5 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
            name="sensorId"
            id="sensorId"
            placeholder="Sensor ID"
            maxLength="5"
        />

       
        <label className="block text-black-600 mt-3"><strong>Nome</strong></label>
        <input
            className="mt-1 block w-full rounded border border-gray-300 p-1.5 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
            id="nomePessoa"
            name="nomePessoa"
            placeholder='Nome pessoa'
        />

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

        
        <label className="block text-black-600 mt-3"><strong>Data Início</strong></label>
        <input
            type="date"
            className="mt-1 block w-full rounded border border-gray-300 p-1.5 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
            id="dataInicio"
            name="dataInicio"
        />

       
        <label className="block text-black-600 mt-3"><strong>Data Fim</strong></label>
        <input
            type="date"
            className="mt-1 block w-full rounded border border-gray-300 p-1.5 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
            id="dataTermino"
            name="dataTermino"
        />

      {!!errorMessage && (
            <div className="mt-1 font-semibold text-red-500">
              {errorMessage}
            </div>
          )}

        <button
            type="submit"
            className="rounded bg-teal-500 px-4 py-2 text-white hover:bg-teal-600 mt-5"
        >
            Consultar
        </button>
    </form>

    
  </div>

      <div className="max-w-4xl mx-auto p-5">
      {sensoresFiltrados.length === 0 ? (
        <div className="text-center text-gray-600 italic">Nenhum sensor encontrado.</div>
      ) : (
        sensoresFiltrados.map(sensor => (
          <div key={sensor.id} className="bg-white shadow-2xl rounded-lg overflow-hidden my-4">
            <div className="p-5 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-teal-600">ID: {sensor.id}</h3>
              <p className="text-gray-600">Nome pessoa: {sensor.nomePessoa}</p>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <p className="text-gray-700"><span className="font-semibold">Tipo do sensor:</span> {returnNomeSensor(sensor.tipoSensor)}.</p>
                  <p className="text-gray-700"><span className="font-semibold">Data:</span> {returnDataFormat(sensor.data)}</p>
                </div>
                <div>
                  <p className="text-gray-700"><span className="font-semibold">Ordem da Tendência:</span> {sensor.ordemTendencia}</p>
                  <p className="text-gray-700"><span className="font-semibold">R²:</span> {sensor.r2}</p>
                </div>
              </div>
              <p className="text-gray-700 pt-3"><span className="font-semibold">Equação de Calibração:</span> {sensor.equacaoCalibracao}</p>
              <p className="text-gray-700 break-words"><span className="font-semibold">Descrição:</span> {sensor.descricao}.</p>
            </div>
          </div>
        ))
      )}
    </div>
</>
  );
}