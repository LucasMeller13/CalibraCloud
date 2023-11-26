import { useState } from 'react';
import { useListaCadastro} from '../context/ListaCadastroContext';

export default function Edicao() {
  const [selectedSensor, setSelectedSensor] = useListaCadastro();
  const [errorMessage, setErrorMessage] = useState('');
  const [isDisabled, setIsDisabled] = useState(true);
  const [isValidId, setIsValidId] = useState(false);
  const [items, setItems] = useListaCadastro();
  const [messageMood, setMessageMood] = useState(false);

  const [nomeInput, SetNomeInput] = useState('');
  const [dataInput, SetDataInput] = useState('');
  const [dropdownTipoSensorInput, SetdropdownTipoSensorInput] = useState('');
  const [ordemTendenciaInput, SetOrdemTendenciaInput] = useState('');
  const [descricaoInput, SetDescricaoInput] = useState('');
  const [equacaoInput, SetEquacaoInput] = useState('');
  const [r2Input, setR2Input] = useState('');

  function checkId(event) {
    const idSensorInput = event.target.value;
    const sensorPresente = selectedSensor.some(sensor => sensor.id === idSensorInput);
    setErrorMessage('');
    setIsValidId(sensorPresente);

    if (sensorPresente) {
      const sensorEncontrado = selectedSensor.find(sensor => sensor.id === idSensorInput);
      setIsDisabled(false);
      SetNomeInput(sensorEncontrado.nomePessoa)
      SetdropdownTipoSensorInput(sensorEncontrado.tipoSensor)
      SetDataInput(sensorEncontrado.data)
      SetOrdemTendenciaInput(sensorEncontrado.ordemTendencia)
      SetDescricaoInput(sensorEncontrado.descricao)
      SetEquacaoInput(sensorEncontrado.equacaoCalibracao)
      setR2Input(sensorEncontrado.r2)
    } else {
      setIsDisabled(true);
      SetNomeInput('')
      SetdropdownTipoSensorInput('')
      SetDataInput('')
      SetOrdemTendenciaInput('')
      SetDescricaoInput('')
      SetEquacaoInput('')
      setR2Input('')
    }
  }

  function consultarSensor(event){
    event.preventDefault();
    const form = event.currentTarget;
    const formData = new FormData(form);

    const confirmacaoEdicaoUser = window.confirm(`Tem certeza que deseja editar os dados do sensor ${formData.get('sensorId')}?`);

    if (confirmacaoEdicaoUser) {

      if (
        formData.get('equacaoCalibracao') !== '' ||
        formData.get('nomePessoa') !== '' ||
        formData.get('dataCalibracao') !== '' ||
        formData.get('descricaoCalibracao') !== '' ||
        formData.get('dropdownTipoSensor') !== ''
      ) {

        let idForm = formData.get('sensorId');
        let nome = formData.get('nomePessoa');
        let sensorTipo = formData.get('dropdownTipoSensor')
        let ordemTendenciaForm = formData.get('ordemTendencia')
        let r2Form = formData.get('r2')
        let dataCalibracao = formData.get('dataCalibracao');
        let descricaoForm = formData.get('descricaoCalibracao');
        let equacaoCalibracaoForm = formData.get('equacaoCalibracao');

        const newItem = {
          id: idForm,
          tipoSensor: sensorTipo,
          r2: +r2Form,
          ordemTendencia: +ordemTendenciaForm,
          data: dataCalibracao,
          nomePessoa: nome,
          descricao: descricaoForm,
          equacaoCalibracao: equacaoCalibracaoForm
        };

        setItems(items.map(item => {
          if (item.id === newItem.id) {
            return newItem;
          }
          return item;
        }));
  
        form.reset();
        setMessageMood(true);
        setErrorMessage('Edição feita!');
      
      } else {
        setErrorMessage('Preencha todos os campos!');
      }
    } else {
      setMessageMood(false)
      setErrorMessage('Usuário cancelou a edição dos dados.');
    }
  }

  return (
    <>
    <div>
    <form method="get" className="rounded bg-gray-100 p-3.5 shadow-2xl" onSubmit={consultarSensor}>
        
        <label htmlFor="sensorId" className="block text-black-600"><strong>ID</strong></label>
        <input
            className={`mt-1 block w-full rounded-lg border-2 p-1.5 ${
              isValidId ? 'border-green-500 bg-green-100 focus:ring-2 focus:ring-green-500' : 'border-red-500 bg-red-100 focus:ring-2 focus:ring-red-500'
            }`}
            name="sensorId"
            id="sensorId"
            placeholder="Sensor ID"
            onChange={checkId}
        />

       
        <label className="block text-black-600 mt-3"><strong>Nome</strong></label>
        <input
            className="mt-1 block w-full rounded border border-gray-300 p-1.5 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
            id="nomePessoa"
            name="nomePessoa"
            placeholder='Nome pessoa'
            onChange={(e) => SetNomeInput(e.target.value)}
            value={nomeInput}
            disabled={isDisabled}
        />

          <label className="block text-black-600 mt-3"><strong>Tipo do sensor</strong></label>
          <select
            className="mt-1 block w-full rounded border border-gray-300 p-1.5 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
            id="dropdownTipoSensor"
            name="dropdownTipoSensor"
            value={dropdownTipoSensorInput}
            onChange={(e) => SetdropdownTipoSensorInput(e.target.value)}
            disabled={isDisabled}
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

        
        <label className="block text-black-600 mt-3"><strong>Data Calibração</strong></label>
        <input
            type="date"
            className="mt-1 block w-full rounded border border-gray-300 p-1.5 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
            id="dataCalibracao"
            name="dataCalibracao"
            value={dataInput}
            onChange={(e) => SetDataInput(e.target.value)}
            disabled={isDisabled}
        />

        <label className="block text-black-600 mt-3">
            <strong>Ordem da linha de tendência</strong>
          </label>
          <input
            id="ordemTendencia"
            name="ordemTendencia"
            type="number"
            value={ordemTendenciaInput}
            disabled={isDisabled}
            onChange={(e) => SetOrdemTendenciaInput(e.target.value)}
            min="1"
            max="10"
            className="mt-1 block w-full rounded border border-gray-300 p-1.5 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
          />
          <label className="block text-black-600 mt-3"><strong>R²</strong></label>
          <input
            id="r2"
            name="r2"
            type="number"
            value={r2Input}
            disabled={isDisabled}
            onChange={(e) => setR2Input(e.target.value)}
            min="0.0"
            max="1.0"
            step="0.001"
            className="mt-1 block w-full rounded border border-gray-300 p-1.5 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
          />
          <label className="block text-black-600 mt-3"><strong>Descrição</strong></label>
          <input
            id="descricaoCalibracao"
            name="descricaoCalibracao"
            value={descricaoInput}
            disabled={isDisabled}
            onChange={(e) => SetDescricaoInput(e.target.value)}
            placeholder='Como foi feito a calibração, qual método utilizado, características específicas do sensor, etc...'
            className="mt-1 block w-full rounded border border-gray-300 p-1.5 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
          />
          <label className="block text-black-600 mt-3">
            <strong>Equação de calibração</strong>
          </label>
          <input
            id="equacaoCalibracao"
            disabled={isDisabled}
            value={equacaoInput}
            onChange={(e) => SetEquacaoInput(e.target.value)}
            name="equacaoCalibracao"
            placeholder='y = 234.12x^3 + x^2 - 324.1'
            className="mt-1 block w-full rounded border border-gray-300 p-1.5 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
          />

          {!!errorMessage && (
          <div className="mt-1 font-semibold"
              style={{ color: messageMood ? 'green' : 'red' }}>
              {errorMessage}
          </div>
            )}

        <button
            type="submit"
            className="rounded bg-teal-500 px-4 py-2 text-white hover:bg-teal-600 mt-5"
        >
            Editar
        </button>
    </form>

    
  </div>
</>
  );
}
