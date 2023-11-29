import { useState } from 'react';
import { useListaCadastro } from '../context/ListaCadastroContext';
import { PieChartComponent, BarChartSensorQtData, BarChartSensorQtTipo } from '../routes/Charts'

export default function Dashboard() {
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

  function returnsQtTipo(data) {
    const countMap = new Map();
    
    data.forEach((sensor) => {
      const tipoSensor = sensor.tipoSensor;
      countMap.set(tipoSensor, (countMap.get(tipoSensor) || 0) + 1);
    });

    const resultArray = Array.from(countMap, ([x, y]) => ({
    x,
    y,
    }));

    //console.log(data)
    console.log(resultArray)
    
    return resultArray
    
  }

  function returnsQtNome(data) {
  const countMap = new Map();
  
  data.forEach((sensor) => {
    const tipoSensor = maxWidthNome(sensor.nomePessoa.toLowerCase(),7);
    countMap.set(tipoSensor, (countMap.get(tipoSensor) || 0) + 1);
  });

  const resultArray = Array.from(countMap, ([name, y]) => ({
  name,
  y,
  }));

  //console.log(data)
  console.log(resultArray)
  
  return resultArray
    
  }

  function maxWidthDescricao(x) {
    if (x.length > 35) {
      return x.slice(0,36)+"..."
    } else {
      return x
    }
  }

  function maxWidthEquacao(x) {
    if (x.length > 35) {
      return x.slice(0,36)+"..."
    } else {
      return x
    }
  }

  function maxWidthNome(x,y) {
    if (x.length > y) {
      return x.slice(0,y+1)+"..."
    } else {
      return x
    }
  }

  function returnQtData(data) {
    
    const countMap = new Map();
    
  data.forEach((sensor) => {
    const mesAno = sensor.data.slice(0, 7); 
    let mesAnoCorreto = returnNomeMes(mesAno)
    countMap.set(mesAnoCorreto, (countMap.get(mesAnoCorreto) || 0) + 1);
  });

  const resultArray = Array.from(countMap, ([x, y]) => ({
    x,
    y,
    }));
    
    //console.log(resultArray)

    const ordemMeses = ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun', 'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez']
    const ordemAnos = Array.from(new Set(resultArray.map(x => +x.x.slice(4, 8)))).sort()
    let tempArray = []

    for (let c = 0; c < ordemAnos.length; c++) {
      for (let a = 0; a < ordemMeses.length; a++) {
        for (let b = 0; b < resultArray.length; b++) {
          if (resultArray[b].x.slice(0, 3) == ordemMeses[a] && resultArray[b].x.slice(4, 8) == `${ordemAnos[c]}`) {
            tempArray.push(resultArray[b])
          }
        }
      }
    }

    console.log(tempArray)
    
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

  console.log(selectedSensor)
  
  return (
    <>
      <div className='p-3 rounded-2xl 
                      strong-shadow bg-gradient-diagonal border-4 border-sky-950 w-full'>
        <div className='ml-10 mr-10 mb-10 mt-5 p-3 underline-offset-8 underline decoration-2'>
          <h1 className='text-5xl underline-offset-8'>Bem vindo, {nomeLogin}.</h1>
        </div>
        <div className='.bg-gradient-diagonal'>
          <div className="grid grid-cols-3 gap-4">
            <div className="bg-gray-800 p-4 m-3 rounded-lg strong-shadow hover:bg-gray-900 border-2 border-sky-950 hover:bg-gpr-12ray-700 transition ease-in-out delay-50 hover:-translate-y-0.5">
              <div className=' p-4 rounded-lg font-semibold text-xl text-white'>
                <h2 className='text-2xl font-bold mb-4'>Último sensor adicionado:</h2>
                <table className="w-max">
                  <tbody>
                    <tr>
                      <td className='border-2 border-sky-600 p-2 pr-2 font-bold'>Sensor ID</td>
                      <td className='border-2 border-sky-600 p-2'>{selectedSensor[selectedSensor.length - 1].id}</td>
                    </tr>
                    <tr>
                      <td className='border-2 border-sky-600 p-2 pr-2 font-bold'>Nome</td>
                      <td className='border-2 border-sky-600 p-2'>{maxWidthNome(selectedSensor[selectedSensor.length - 1].nomePessoa,10)}</td>
                    </tr>
                    <tr>
                      <td className='border-2 border-sky-600 p-2 pr-2 font-bold'>Data de Cadastro</td>
                      <td className='border-2 border-sky-600 p-2'>{returnDataFormat(selectedSensor[selectedSensor.length - 1].data)}</td>
                    </tr>
                    <tr>
                      <td className='border-2 border-sky-600 p-2 pr-2 font-bold'>Tipo de Sensor</td>
                      <td className='border-2 border-sky-600 p-2'>{returnNomeSensor(selectedSensor[selectedSensor.length - 1].tipoSensor) 
                              === 'Sensor de temperatura'? 'Sen. de Temperatura' : returnNomeSensor(selectedSensor[selectedSensor.length - 1].tipoSensor)}</td>
                    </tr>
                    <tr>
                      <td className='border-2 border-sky-600 p-2 pr-2 font-bold'>R²</td>
                      <td className='border-2 border-sky-600 p-2'>{selectedSensor[selectedSensor.length - 1].r2}</td>
                    </tr>
                    <tr>
                      <td className='border-2 border-sky-600 p-2' colSpan="2">
                      <p className='font-bold'>Equação de Calibração:</p>
                      <p className='text-lg'>{maxWidthEquacao(selectedSensor[selectedSensor.length - 1].equacaoCalibracao)}</p>
                      </td>
                    </tr>
                    <tr>
                      <td className='border-2 border-sky-600 p-2 break-words' colSpan="2">
                        <p className='break-words font-bold'>Descrição: </p>
                        <p className='text-lg'>{maxWidthDescricao(selectedSensor[selectedSensor.length - 1].descricao)}</p>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className="strong-shadow border-2 border-sky-950 p-4 m-3 col-span-2 bg-gray-300 rounded-lg transition ease-in-out delay-50 hover:-translate-y-0.5">
              <BarChartSensorQtData data={returnQtData(selectedSensor)} />
            </div>
          </div>
              <div className="grid grid-cols-3 gap-4 f">
            <div className="strong-shadow border-2 border-sky-950 bg-gray-800 hover:bg-gray-900 p-4 m-3 rounded-lg shadow-xl transition ease-in-out delay-50 hover:-translate-y-0.5">
                <div className=''>
                  <PieChartComponent data={returnsQtNome(selectedSensor)} />
                </div>
                </div>
                <div className="strong-shadow border-2 border-sky-950 p-4 m-3 col-span-2 bg-gray-300 rounded-lg transition ease-in-out delay-50 hover:-translate-y-0.5">
                  <BarChartSensorQtTipo data={returnsQtTipo(selectedSensor)} />
                </div>
              </div>
          </div>
      </div>
      <div className='mt-40'></div>
    </>
  );
}
