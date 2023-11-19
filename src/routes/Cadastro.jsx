import { useState } from 'react';

import { useListaCadastro, generateId } from '../context/ListaCadastroContext';

import Sensores from '../sensors.json';

export default function Cadastro() {
  const [items, setItems] = useListaCadastro();
  const [errorMessage, setErrorMessage] = useState('');

  const idGeneratedSensor = generateId();
  const todayDate = new Date();

  let date = todayDate.getDate() + "/"+ parseInt(todayDate.getMonth()+1) +"/"+todayDate.getFullYear();


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
        r2: formData.get('r2'),
        ordemTendencia: formData.get('ordemTendencia'),
        data: date,
        nomePessoa: formData.get('nomePessoa'),
        descricao: formData.get('descricaoCalibracao'),
        equacaoCalibracao: formData.get('equacaoCalibracao')
      };

      // mantando os itens já cadastrados e adicionando o novo no final
      setItems([...items, newItem]);

      // resetando o form e apagando mensagens de erro antigas
      form.reset();
      setErrorMessage('');
      console.log(items);
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
        <h3><strong>Data da calibração:</strong> {date}</h3>
          <label className="block text-black-600">Nome</label>
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
            <option value="celulaCarga">Célula de carga</option>
            <option value="sensorDistancia">Sensor de distância</option>
            <option value="sensorPressao">Sensor de pressão</option>
            <option value="decibelimetro">Decibelímetro</option>
            <option value="acelerometro">Acelerômetro</option>
            <option value="extensometro">Extensômetro</option>
            <option value="sensorTemperatura">Sensor de temperatura</option>
          </select>
          <label className="block text-black-600 mt-3">
            Ordem da linha de tendência
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
          <label className="block text-black-600 mt-3">R²</label>
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
          <label className="block text-black-600 mt-3">Descrição</label>
          <input
            id="descricaoCalibracao"
            name="descricaoCalibracao"
            className="mt-1 block w-full rounded border border-gray-300 p-1.5 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
          />
          <label className="block text-black-600 mt-3">
            Equação de calibração
          </label>
          <input
            id="equacaoCalibracao"
            name="equacaoCalibracao"
            className="mt-1 block w-full rounded border border-gray-300 p-1.5 focus:border-teal-500 focus:ring focus:ring-teal-500 focus:ring-opacity-50"
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
            Cadastrar sensor
          </button>
        </form>
      </div>
    </>
  );
}
