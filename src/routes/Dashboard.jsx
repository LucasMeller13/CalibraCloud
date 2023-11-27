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

  function returnNomeMes(x) {
    const month = x.slice(5, 7)
    const year = x.slice(0,4)
    switch (month) {
      case '01':
        return 'Jan/' + year;
        break;
      case '02':
        return 'Fev/' + year;
        break;
      case '03':
        return 'Mar/' + year;
        break;
      case '04':
        return 'Abr/' + year;
        break;
      case '05':
        return 'Mai/' + year;
        break;
      case '06':
        return 'Jun/' + year;
        break;
      case '07':
        return 'Jul/' + year;
        break;
      case '08':
        return 'Ago/' + year;
        break;
      case '09':
        return 'Set/' + year;
        break;
      case '10':
        return 'Out/' + year;
        break;
      case '11':
        return 'Nov/' + year;
        break;
      case '12':
        return 'Dez/' + year;
        break;
    }
  }

  function returnQtData(data) {
    
    const countMap = new Map();
    
  data.forEach((sensor) => {
    const mesAno = sensor.data.slice(0, 7); 
    let mesAnoCorreto = returnNomeMes(mesAno)
    countMap.set(mesAnoCorreto, (countMap.get(mesAnoCorreto) || 0) + 1);
  });

  const resultArray = Array.from(countMap, ([monthYear, quantity]) => ({
    monthYear,
    quantity,
  }));
    
    console.log(resultArray)

    const ordemMeses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
    const ordemAnos = Array.from(new Set(resultArray.map(x => +x.monthYear.slice(4, 8)))).sort()
    let tempArray = []

    for (let c = 0; c < ordemAnos.length; c++) {
      for (let a = 0; a < ordemMeses.length; a++) {
        for (let b = 0; b < resultArray.length; b++) {
          if (resultArray[b].monthYear.slice(0, 3) == ordemMeses[a] && resultArray[b].monthYear.slice(4, 8) == `${ordemAnos[c]}`) {
            tempArray.push(resultArray[b])
          }
        }
      }
    }
    
  return tempArray;
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
  
  return (
    <>
      <div className='bg-gray-100 p-1 rounded-2xl shadow-xl'>
        <h1 className='text-5xl m-10 underline-offset-8 underline decoration-2'>Bem vindo, Carimbo.</h1>
        <div className="grid grid-cols-3 gap-4 f">
          <div className=" bg-sky-700 p-4 m-3 rounded-lg shadow-xl">
            <div className='border border-sky-500 p-4 rounded-lg shadow font-semibold text-xl text-white'>
              <h2 className='text-2xl font-bold mb-4'>Último sensor adicionado:</h2>
              <p>Sensor ID: {selectedSensor[selectedSensor.length - 1].id}</p>
              <p>Nome: {selectedSensor[selectedSensor.length - 1].nomePessoa}</p>
              <p>Data de Cadastro: {returnDataFormat(selectedSensor[selectedSensor.length - 1].data)}</p>
              <p>Tipo de Sensor: {returnNomeSensor(selectedSensor[selectedSensor.length - 1].tipoSensor)}</p>
              <p>R²: {selectedSensor[selectedSensor.length - 1].r2}</p>
              <p className='break-words'>Descrição: {selectedSensor[selectedSensor.length - 1].descricao}</p>
              <p>Equação de Calibração:</p>
              <p className='text-lg'>  {selectedSensor[selectedSensor.length - 1].equacaoCalibracao}</p>
            </div>
          </div>
          <div className="p-4 m-3 col-span-2 bg-gray-300 rounded-lg">
            <BarChartSensor data={returnQtData(selectedSensor)} />
          </div>
        </div>
        
      </div>
    </>
  );
}
