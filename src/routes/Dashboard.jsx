import { useState } from 'react';
import { useListaCadastro } from '../context/ListaCadastroContext';
import { LineChartSensor, BarChartSensor } from '../routes/Charts'

export default function Dashboard() {
  const [selectedSensor, setSelectedSensor] = useListaCadastro();
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

  function returnDataQtMes() {
    
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

  const data = [
  { name: 'out/2023', value: 400 },
  { name: 'nov/2023', value: 300 },
  { name: 'dez/2023', value: 200 },
  { name: 'jan/2024', value: 278 },
];
  
  return (
    <>
      <div className='bg-gray-100'>
      <h1 className='text-5xl m-10'>Bem vindo, Carimbo.</h1>
        <LineChartSensor data={data} />
        <BarChartSensor data={data} />
      </div>
    </>
  );
}
