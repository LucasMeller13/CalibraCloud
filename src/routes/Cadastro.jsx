import { useState, useEffect } from 'react';

import { useListaCadastro, generateId } from '../context/ListaCadastroContext';


export default function Cadastro() {
  const [items, setItems] = useListaCadastro();
  const [errorMessage, setErrorMessage] = useState('');

  const idGeneratedSensor = generateId();
  const todayDate = new Date();

  let dateJSX = todayDate.getFullYear() + "-" + parseInt(todayDate.getMonth()+1) + "-" + todayDate.getDate()
  let date = todayDate.getDate() + "/"+ parseInt(todayDate.getMonth()+1) +"/"+todayDate.getFullYear();

  useEffect(() => {
    console.log("Items after update:", items);
  }, [items]);

  function addItem(event) {
    event.preventDefault();

    // esta é uma nova ideia de como pegar os valores do form
    // diferente da aula de HOOKs em que incentivei o uso de useState
    // um campo para cada form ou um objeto para todos os campos
    // aqui estamos acessando direto o DOM do form e lendo os valores
    // dos campos por seus IDs/name
    const form = event.currentTarget;
    const formData = new FormData(form);
    if (
      formData.get('nomePessoa') !== '' &&
      formData.get('dropdownTipoSensor') !== '' &&
      formData.get('descricaoCalibracao') !== '' &&
      formData.get('equacaoCalibracao') !== ''
    ) {
      // objeto que representa nosso novo item
      const newItem = {
        id: idGeneratedSensor,
        tipoSensor: formData.get('dropdownTipoSensor'),
        r2: +formData.get('r2'),
        ordemTendencia: +formData.get('ordemTendencia'),
        data: dateJSX,
        nomePessoa: formData.get('nomePessoa'),
        descricao: formData.get('descricaoCalibracao'),
        equacaoCalibracao: formData.get('equacaoCalibracao')
      };

      // mantando os itens já cadastrados e adicionando o novo no final
      setItems([...items, newItem]);
      
      // resetando o form e apagando mensagens de erro antigas
      form.reset();
      setErrorMessage('');
      
    } else {
      setErrorMessage('Preencha todos os campos!');
    }
  }
  return (
    <>
      <div className="">
        <form onSubmit={addItem}
        method="get"
        className="mt-6 rounded bg-gray-100 p-3.5">
        <h3><strong>ID:</strong> {idGeneratedSensor}</h3>
          <label className="block text-black-600"><strong>Nome</strong></label>
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
            <option value="celulaCarga">Célula de carga</option>
            <option value="sensorDistancia">Sensor de distância</option>
            <option value="sensorPressao">Sensor de pressão</option>
            <option value="decibelimetro">Decibelímetro</option>
            <option value="acelerometro">Acelerômetro</option>
            <option value="extensometro">Extensômetro</option>
            <option value="sensorTemperatura">Sensor de temperatura</option>
          </select>
          <label className="block text-black-600 mt-3">
            <strong>Ordem da linha de tendência</strong>
          </label>
          <input
            id="ordemTendencia"
            name="ordemTendencia"
            type="number"
            defaultValue={1}
            min="1"
            max="10"
            className="mt-1 block w-full rounded border border-gray-300 p-1.5 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
          />
          <label className="block text-black-600 mt-3"><strong>R²</strong></label>
          <input
            id="r2"
            name="r2"
            type="number"
            defaultValue={1}
            min="0.0"
            max="1.0"
            step="0.001"
            className="mt-1 block w-full rounded border border-gray-300 p-1.5 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
          />
          <label className="block text-black-600 mt-3"><strong>Descrição</strong></label>
          <input
            id="descricaoCalibracao"
            name="descricaoCalibracao"
            placeholder='Como foi feito a calibração, qual método utilizado, características específicas do sensor, etc...'
            className="mt-1 block w-full rounded border border-gray-300 p-1.5 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
          />
          <label className="block text-black-600 mt-3">
            <strong>Equação de calibração</strong>
          </label>
          <input
            id="equacaoCalibracao"
            name="equacaoCalibracao"
            placeholder='y = 234.12x^3 + x^2 - 324.1'
            className="mt-1 block w-full rounded border border-gray-300 p-1.5 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
          />
          {!!errorMessage && (
            <div className="mt-1 font-semibold text-red-500">
              {errorMessage}
            </div>
          )}
          <h3 className='mt-3'><strong>Data de cadastro:</strong> {date}</h3>
          <button
            type="submit"
            className="rounded bg-teal-500 px-4 py-2 text-white hover:bg-teal-600 mt-5"
          >
            Cadastrar sensor
          </button>
        </form>
      </div>
    </>
  );
}
