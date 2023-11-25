import React, { useState } from 'react';
import Sensores from '../sensors.json';
import { useListaCadastro} from '../context/ListaCadastroContext';

export default function Consulta() {

  const [selectedSensor, setSelectedSensor] = useListaCadastro();
  const [errorMessage, setErrorMessage] = useState('');
  const [sensors, setSensors] = useState(selectedSensor);

  /*
  const handleIdChange = (event) => {
    setSelectedId(event.target.value);
  };

    
  const handleQuery = (event) => {
    event.preventDefault();
    const sensor = selectedSensor.find((sensor) => sensor.sensorId === selectedId);
    setSelectedSensor(sensor);
  };*/

  function consultarSensor(event){
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);
    if (
      formData.get('sensorId') !== '' || 
      formData.get('nomePessoa') !== '' ||
      formData.get('dataInicio') !== '' ||
      formData.get('dataTermino') !== '' ||
      formData.get('dropdownTipoSensor') !== 'escolha'
    ) {
      console.log(formData.get('dataInicio'))
      
      // resetando o form e apagando mensagens de erro antigas
      form.reset();
      setErrorMessage('');
      
    } else {
      setErrorMessage('Preencha algum dos campos!');
    }
  }

  return (
    /*
    <div>
      <form onSubmit={handleQuery}>
        <label htmlFor="sensorId">insira o ID do Sensor :</label>
        <input className="mt-1 block w-full rounded border border-gray-300 p-1.5 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
          type="text"
          id="sensorId"
          value={selectedId}
          onChange={handleIdChange}
        />
        <button  type="submit" 
        className="rounded bg-teal-500 px-4 py-2 text-white hover:bg-teal-600 mt-3 mb-3"
        >Consultar Sensor</button>
      </form>
      {selectedSensor ? (
        <pre>{JSON.stringify(selectedSensor, null, 2)}</pre>
      ) : (
        <p>No sensor selected</p>
      )}
    </div>*/
    <>
    <div>
    <form method="get" className="rounded bg-gray-100 p-3.5" onSubmit={consultarSensor}>
        
        <label htmlFor="sensorId" className="block text-black-600">ID:</label>
        <input
            className="mt-1 block w-full rounded border border-gray-300 p-1.5 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
            name="sensorId"
            id="sensorId"
        />

       
        <label className="block text-black-600 mt-3">Nome Pessoa</label>
        <input
            className="mt-1 block w-full rounded border border-gray-300 p-1.5 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
            id="nomePessoa"
            name="nomePessoa"
        />

          <label className="block text-black-600 mt-3">Tipo do sensor</label>
          <select
            className="mt-1 block w-full rounded border border-gray-300 p-1.5 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
            id="dropdownTipoSensor"
            name="dropdownTipoSensor"
          >
            <option value="escolha">Escolher sensor</option>
            <option value="celulaCarga">Célula de carga</option>
            <option value="sensorDistancia">Sensor de distância</option>
            <option value="sensorPressao">Sensor de pressão</option>
            <option value="decibelimetro">Decibelímetro</option>
            <option value="acelerometro">Acelerômetro</option>
            <option value="extensometro">Extensômetro</option>
            <option value="sensorTemperatura">Sensor de temperatura</option>
          </select>

        
        <label className="block text-black-600 mt-3">Data de Início</label>
        <input
            type="date"
            className="mt-1 block w-full rounded border border-gray-300 p-1.5 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
            id="dataInicio"
            name="dataInicio"
        />

       
        <label className="block text-black-600 mt-3">Data de Término</label>
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
      {sensors.length === 0 ? (
        <div className="text-center text-gray-600 italic">Nenhum sensor salvo até o momento.</div>
      ) : (
        sensors.map(sensor => (
          <div key={sensor.id} className="bg-white shadow-lg rounded-lg overflow-hidden my-4">
            <div className="p-5 border-b border-gray-200">
              <h3 className="text-lg font-semibold text-teal-600">ID: {sensor.id}</h3>
              <p className="text-gray-600">Nome pessoa: {sensor.nomePessoa}</p>
            </div>
            <div className="p-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                <div>
                  <p className="text-gray-700"><span className="font-semibold">Tipo do sensor:</span> {sensor.tipoSensor}</p>
                  <p className="text-gray-700"><span className="font-semibold">Data:</span> {sensor.data}</p>
                </div>
                <div>
                  <p className="text-gray-700"><span className="font-semibold">Ordem da Tendência:</span> {sensor.ordemTendencia}</p>
                  <p className="text-gray-700"><span className="font-semibold">R²:</span> {sensor.r2}</p>
                </div>
              </div>
              <p className="text-gray-700 pt-3"><span className="font-semibold">Equação de Calibração:</span> {sensor.equacaoCalibracao}.</p>
              <p className="text-gray-700 break-words"><span className="font-semibold">Descrição:</span> {sensor.descricao}.</p>
            </div>
          </div>
        ))
      )}
    </div>
</>
  );
}


/* {selectedSensor ? (
        <pre>{JSON.stringify(selectedSensor, null, 2)}</pre>
      ) : (
        <p>No sensor selected</p>
      )} */


/*
{sensors.map((sensor) => (
          <div key={sensor.id} className='rounded bg-red-100 p-3.5 mt-5'>
            {sensor.id} - {sensor.tipoSensor} - {sensor.nomePessoa} 
            - {sensor.r2} - {sensor.data} - {sensor.descricao} - 
            {sensor.ordemTendencia} - {sensor.equacaoCalibracao}
          </div>
          
        ))}
 
      {sensors.length === 0 && (
        <p className="font-semibold text-gray-600">
          Nenhum sensor salvo até o momento.
        </p>
      )}
*/