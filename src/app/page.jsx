'use client'
import WhatsAppButton from '@/components/WhatsAppButton';
import { useLogin } from '@/hooks/useLogin';
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { airtableAPI } from '../service/airtableAPI';
import './page.css';

function App() {
  const navigate = useRouter();
  // Estado para armazenar o valor do campo de e-mail
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isSendMail, setIsSendMail] = useState(false);
  // Estado para armazenar a mensagem de erro
  const [errorMessage, setErrorMessage] = useState('');
  const [isClient, setIsClient] = useState(false);

  const { login } = useLogin()

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
        localStorage.removeItem('sessionValidityPeriod');
      }
    };

    window.addEventListener('resize', detectDevToolsOpen);

    const expiryDate = localStorage.getItem('sessionValidityPeriod');

    if (expiryDate) {
      const currentDate = new Date();
      const expirationDate = new Date(expiryDate);

      // Verifica se a data atual é maior que a data de expiração
      if (currentDate > expirationDate) {
        // Limpa o localStorage se o token expirou
        localStorage.removeItem('sessionValidityPeriod');
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
      // Convert the email to lower case
      const lowerCaseEmail = email.toLowerCase();
      // Create a formula that converts both sides of the comparison to lower case
      const formula = `LOWER({Email})='${lowerCaseEmail}'`;
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
      await login(email)
      setIsSendMail(true);

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

  if (!isClient) return <h1 className='bg-[#110E0F] w-screen h-screen text-white font-bold text-3xl titleForm text-center flex justify-center items-center'>Carregando...</h1>;

  return (
    <div className="flex h-screen bg-[#110E0F]">
      <Analytics />
      <SpeedInsights />
      <WhatsAppButton />
      {/* Metade da tela vazia */}

      {/* Metade da tela com bloco de login */}
      <div className="w-full flex flex-col justify-center items-center bg-[#110E0F] bg-gradient-to-r from-[#7bc8005b] from-1% to-transparent to-35% ml-auto">
        <div className="mb-8 text-center">
          <img src="https://i.postimg.cc/NMPbb670/Logo-light.png" alt="Logo" className="w-48 mx-auto" />
        </div>


        {
          isSendMail
            ?
            <div className="w-[90%] md:w-[60%] rounded-md bg-gradient-to-tr from-[#374500] to-[#C4F400] p-[1px]">
              <div className="flex flex-col h-full w-full p-8 bg-[#110E0F]  rounded-md">
                <h2 className="titleForm text-xl md:text-2xl font-bold text-white">Verifique seu email para acessar.</h2>
              </div>
            </div>
            :
            <div className="w-[90%] md:w-[35%] rounded-md bg-gradient-to-tr from-[#374500] to-[#C4F400] p-[1px]">
              <div className="flex flex-col h-full w-full p-8 bg-[#110E0F]  rounded-md">
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
                      className="formsText w-full px-4 py-2 bg-white bg-opacity-10 border border-[#C4F400] rounded-sm text-white focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  {/* Exibe a mensagem de erro em vermelho */}
                  {errorMessage && <p className="text-red-500 text-sm mb-2 formsText">{errorMessage}</p>}
                  <button
                    type="submit"
                    className="w-full py-2 text-white font-semibold rounded-md bg-gradient-to-tr from-[#374500] to-[#C4F400] focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-center items-center"
                    disabled={isLoading}
                  >
                    {isLoading ? "Carregando..." : <p className='formsText'>ACESSAR</p>}
                  </button>
                </form>
              </div>
            </div>
        }
      </div>
    </div>
  );
}

export default App;
