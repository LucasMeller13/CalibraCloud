import { useState } from 'react';
import { useListaCadastro} from '../context/ListaCadastroContext';

export default function Remocao() {
  const {selectedSensor, setSelectedSensor, nomeLogin, setNomeLogin} = useListaCadastro();
  const [errorMessage, setErrorMessage] = useState('');
  const [isValidId, setIsValidId] = useState(false);
  const [sensoresFiltrados, SetSensoresFiltrados] = useState(selectedSensor);
  const [messageMood, setMessageMood] = useState(false);

  function returnDataFormat(x) {
    let [year, month, day] = x.split('-');
    return `${day}/${month}/${year}`;
  }

  function checkId(event) {
    setErrorMessage('');
    const idSensorInput = event.target.value;
    const sensorPresente = selectedSensor.some(sensor => sensor.id === idSensorInput);
    //setErrorMessage('');
    setIsValidId(sensorPresente);

    if (sensorPresente) {
      const sensorEncontrado = selectedSensor.find(sensor => sensor.id === idSensorInput)
      SetSensoresFiltrados([sensorEncontrado])

    } else {
      SetSensoresFiltrados(selectedSensor)
    }
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
      formData.get('sensorId') !== '' &&
      isValidId
    ) {

      let id = formData.get('sensorId');

      const confirmacaoEdicaoUser = window.confirm(`Tem certeza que deseja remover o sensor (${id}) do banco de dados?`);

      if (confirmacaoEdicaoUser) {
        setSelectedSensor(selectedSensor.filter(item => item.id !== id))
        SetSensoresFiltrados(selectedSensor)
        setMessageMood(true)
        setErrorMessage(`Sensor com id (${id}) removido com sucesso!`)
      } else {
        setMessageMood(false)
        setErrorMessage(`Remoção impedida pelo usuário do sensor com id (${id}).`)
        SetSensoresFiltrados(selectedSensor)
      }

      form.reset();
      
    } else {
      SetSensoresFiltrados(selectedSensor)
    }
  }

  return (
    <>
    <div className='flex justify-center items-center'>
    <form method="get" className="rounded-xl text-lg mt-10 bg-gray-100 w-1/2 pl-6 pr-6 pb-6 pt-4 border-4 border-sky-950 strong-shadow" onSubmit={consultarSensor}>
        
        <label htmlFor="sensorId" className="block text-black-600"><strong>ID</strong></label>
        <input
            className={`mt-1 block w-full rounded-lg border-2 p-1.5 ${
              isValidId ? 'border-green-500 bg-green-100 focus:ring-2 focus:ring-green-500' : 'border-red-500 bg-red-100 focus:ring-2 focus:ring-red-500'
            }`}
            name="sensorId"
            id="sensorId"
            placeholder="Sensor ID"
            onChange={checkId}
            maxLength="5"
        />

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

      <div className="max-w-4xl mx-auto text-lg p-5">
      {sensoresFiltrados.length === 0 ? (
        <div className="text-center text-gray-600 italic">Nenhum sensor encontrado.</div>
      ) : (
        sensoresFiltrados.map(sensor => (
          <div key={sensor.id} className="bg-white border-4 border-sky-950 strong-shadow rounded-lg overflow-hidden my-4">
            <div className="p-5 border-b font-semibold text-black border-gray-200">
              <h3 className="text-lg ">ID: {sensor.id}</h3>
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
</>
  );
}
