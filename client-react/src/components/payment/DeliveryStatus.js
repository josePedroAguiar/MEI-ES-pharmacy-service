import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';

const DeliveryStatus = () => {
  const [taskOutputs, setTaskOutputs] = useState(null);
  const [displayValue, setDisplayValue] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(true);

  const fetchTaskOutputs = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/process-payment/');
      setTaskOutputs(response.data);
      setDisplayValue(JSON.stringify(response.data)); // Converte o objeto para uma string para exibição
    } catch (error) {
      console.error('Erro ao obter os outputs:', error);
    }
  };

  useEffect(() => {
    const intervalId = setInterval(fetchTaskOutputs, 3000); // Requisita a cada 3 segundos

    const timeoutId = setTimeout(() => {
      clearInterval(intervalId); // Limpa o intervalo
      setIsRefreshing(false); // Define o estado para parar o refresh
    }, 15000);

    return () => {
      clearInterval(intervalId); // Limpa o intervalo quando o componente é desmontado
      clearTimeout(timeoutId); // Limpa o timeout quando o componente é desmontado
    };
  }, []);

  return (
    <div>
      {displayValue ? (
        <p>{displayValue}</p>
      ) : (
        <p>Carregando os outputs...</p>
      )}
      {isRefreshing && <p>Atualizando...</p>}
    </div>
  );
};

export default DeliveryStatus;
