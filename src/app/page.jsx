'use client'
import React, { useEffect, useState } from 'react';
import { airtableAPI } from '../service/airtableAPI';
import { Analytics } from "@vercel/analytics/react"
import { SpeedInsights } from "@vercel/speed-insights/next"
import './page.css';
import { useRouter } from 'next/navigation';
import { useDocument } from '../hooks/useDocument';
import { db } from '../firebase/config';
import { doc, setDoc, getDoc } from 'firebase/firestore';
import WhatsAppButton from '@/components/WhatsAppButton';

function App() {
  const navigate = useRouter();
  // Estado para armazenar o valor do campo de e-mail
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  // Estado para armazenar a mensagem de erro
  const [errorMessage, setErrorMessage] = useState('');
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const handleRightClick = event => {
      event.preventDefault();
      return false;  // Adiciona return false para tentar reforçar o bloqueio.
    };

    const handleKeyDown = event => {
      if (['F12', 'I', 'C', 'J'].includes(event.key) && (event.ctrlKey && event.shiftKey)) {
        event.preventDefault();
        return false;  // Reforça a prevenção de default para teclas específicas.
      }
    };

    // Adiciona os listeners ao document
    document.addEventListener('contextmenu', handleRightClick);
    document.addEventListener('keydown', handleKeyDown);

    const detectDevToolsOpen = () => {
      const threshold = 160; // Defina um limiar de altura ou largura que você considera indicativo de DevTools abertas
      if (window.outerHeight - window.innerHeight > threshold || window.outerWidth - window.innerWidth > threshold) {
        localStorage.removeItem('expiryDate');
        localStorage.removeItem('email');
      }
    };

    window.addEventListener('resize', detectDevToolsOpen);

    const expiryDate = localStorage.getItem('expiryDate');

    if (expiryDate) {
      const currentDate = new Date();
      const expirationDate = new Date(expiryDate);

      // Verifica se a data atual é maior que a data de expiração
      if (currentDate > expirationDate) {
        // Limpa o localStorage se o token expirou
        localStorage.removeItem('expiryDate');
        localStorage.removeItem('email');
        // Opcional: Você pode redirecionar ou atualizar a interface de usuário aqui se necessário
      } else {
        // Se o token ainda é válido, redireciona para /typebot
        navigate.push('/dashboard');
      }
    }
  }, []);

  // Função para lidar com a alteração no campo de e-mail
  const handleEmailChange = (event) => {
    setEmail(event.target.value);
    // Limpa a mensagem de erro quando o usuário começa a digitar novamente
    setErrorMessage('');
  };

  const fetchEmailRecord = async (email) => {
    try {
      const formula = `{Email}='${email}'`;
      const response = await airtableAPI.get(`tblJ0TsIBkSfImODQ?filterByFormula=${encodeURIComponent(formula)}`);
      const records = response.data.records;

      if (records.length > 0) {
        const activeRecord = records.find(record => record.fields.Status === "Ativo" || record.fields.Status === "Ativa");
        return activeRecord || records[0]; // Se não houver ativo, retorna o primeiro registro encontrado
      } else {
        return null;
      }
    } catch (error) {
      setErrorMessage('Erro ao buscar o registro de email');
      console.error('Erro ao buscar o registro de email:', error);
      return null;
    }
  };

  const fetchFirebaseUser = async (email) => {
    try {
      const userDoc = await getDoc(doc(db, 'users', email));
      if (userDoc.exists()) {
        return userDoc.data();
      } else {
        return null;
      }
    } catch (error) {
      console.error('Erro ao buscar o usuário no Firebase:', error);
      return null;
    }
  };

  const createFirebaseUser = async (email) => {
    try {
      await setDoc(doc(db, 'users', email), { email });
      return true;
    } catch (error) {
      console.error('Erro ao criar usuário no Firebase:', error);
      return false;
    }
  };

  // Função para lidar com o envio do formulário
  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!email.trim()) {
      setErrorMessage('Por favor, insira seu email.');
      return;
    }
    setIsLoading(true);

    // Verifica se o email existe no Airtable
    const record = await fetchEmailRecord(email);
    if (!record) {
      setErrorMessage(
        <span>
          Email não encontrado. Fale com o suporte {' '}
          <a href="http://suporte.jeffecom.com" className='text-[#E741E7] font-bold formsText' target="_blank" rel="noopener noreferrer">Clique aqui</a>.
        </span>
      )
      setIsLoading(false);
      return;
    }

    // Verifica o status do registro encontrado
    const status = record.fields.Status;
    if (status === "Ativo" || status === "Ativa") {
      // Verifica se o email existe no Firebase
      const firebaseUser = await fetchFirebaseUser(email);
      if (!firebaseUser) {
        // Se não existir, cria um novo usuário no Firebase
        const userCreated = await createFirebaseUser(email);
        if (!userCreated) {
          setErrorMessage('Erro ao criar usuário no banco de dados.');
          setIsLoading(false);
          return;
        }
      }

      const expiryDate = new Date();
      expiryDate.setDate(expiryDate.getDate() + 15);

      localStorage.setItem('expiryDate', expiryDate.toISOString());
      localStorage.setItem('email', email);
      setIsLoading(false);
      navigate.push(`/dashboard`);
    } else if (status === "Cancelado" || status === "Cancelada") {
      setIsLoading(false);
      setErrorMessage(
        <span>
          Conta cancelada, Entre em contato. {' '}
          <a href="http://suporte.jeffecom.com" className='text-[#E741E7] font-bold formsText' target="_blank" rel="noopener noreferrer">Clique aqui</a>.
        </span>
      );
    } else if (status === "Reembolsado" || status === "Reembolsada") {
      setIsLoading(false);
      setErrorMessage(
        <span>
          Conta Reembolsada, Entre em contato. {' '}
          <a href="http://suporte.jeffecom.com" className='text-[#E741E7] font-bold formsText' target="_blank" rel="noopener noreferrer">Clique aqui</a>.
        </span>
      );
    } else if (status === "Estornado" || status === "Estornada") {
      setIsLoading(false);
      setErrorMessage(
        <span>
          Conta Estornada, Entre em contato. {' '}
          <a href="http://suporte.jeffecom.com" className='text-[#E741E7] font-bold formsText' target="_blank" rel="noopener noreferrer">Clique aqui</a>.
        </span>
      );
    } else if (status === "Expirado" || status === "Expirada") {
      setIsLoading(false);
      setErrorMessage(
        <span>
          Conta Expirada, Entre em contato. {' '}
          <a href="http://suporte.jeffecom.com" className='text-[#E741E7] font-bold formsText' target="_blank" rel="noopener noreferrer">Clique aqui</a>.
        </span>
      );
    } else {
      setIsLoading(false);
      setErrorMessage(
        <span>
          Verifique sua conta ou entre em contato. {' '}
          <a href="http://suporte.jeffecom.com" className='text-[#E741E7] font-bold formsText' target="_blank" rel="noopener noreferrer">Clique aqui</a>.
        </span>
      );
    }
  };

  if (!isClient) return <h1 className='bg-[#0B060F] w-screen h-screen text-white font-bold text-3xl titleForm text-center flex justify-center items-center'>Carregando...</h1>;

  return (
    <div className="flex h-screen bg-[#0B060F]">
      <Analytics />
      <SpeedInsights />
      <WhatsAppButton />
      {/* Metade da tela vazia */}
      <div className='hidden md:block md:w-1/2 h-full w-[50%] bg-gradient-to-t from-[#7d40f85b] via-[#E741E7] to-[#7d40f85b] pr-[2px]'>
        <div className="bg-[url('/assets/BG.webp')] bg-cover bg-center h-full">
        </div>
      </div>

      {/* Metade da tela com bloco de login */}
      <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-[#0B060F] bg-gradient-to-r from-[#4100C85b] from-1% to-transparent to-35% ml-auto">
        <div className="mb-8 text-center">
          <img src="https://geniusecom.io/wp-content/uploads/2023/04/Logo-light.svg" alt="Logo" className="w-48 mx-auto" />
        </div>
        <div className="w-[90%] md:w-[60%] rounded-md bg-gradient-to-tr from-[#4100C8] to-[#E741E7] p-[1px]">
          <div className="flex flex-col h-full w-full p-8 bg-[#0B060F]  rounded-md">

            {/* Título */}
            <h2 className="titleForm text-xl md:text-2xl font-bold text-white mb-10">Faça seu login</h2>
            {/* Formulário de login */}
            <form onSubmit={handleSubmit}>
              <div className="mb-4">
                <input
                  type="email"
                  id="email"
                  placeholder='Seu email'
                  name="email"
                  value={email}  // Valor do campo de e-mail
                  onChange={handleEmailChange}  // Função para lidar com a mudança no campo de e-mail
                  className="formsText w-full px-4 py-2 bg-white bg-opacity-10 border border-purple-500 rounded-sm text-white focus:outline-none focus:border-blue-500"
                />
              </div>
              {/* Exibe a mensagem de erro em vermelho */}
              {errorMessage && <p className="text-red-500 text-sm mb-2 formsText">{errorMessage}</p>}
              <button
                type="submit"
                className="w-full py-2 text-white font-semibold rounded-md bg-gradient-to-tr from-[#4100C8] to-[#E741E7] focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-center items-center"
                disabled={isLoading}
              >
                {isLoading ? "Carregando..." : <p className='formsText'>ACESSAR</p>}
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
