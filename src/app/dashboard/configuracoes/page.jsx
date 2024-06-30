'use client';

import Sidebar from '@/components/Sidebar';
import { useUserContext } from '@/contexts/UserContext';
import { db } from '@/firebase/config';
import uploadToStorage from '@/hooks/uploadToStorage'; // Importando o hook de upload
import { doc, getDoc } from 'firebase/firestore';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import Header from '../../../components/Header';
import { useFirestore } from '../../../hooks/useFirestore';

import './page.css';

const Configuracoes = () => {
    const navigate = useRouter();
    const email = typeof window !== 'undefined' ? localStorage.getItem('email') || '' : '';
    const { addDocument, updateDocument } = useFirestore('users');
    const [isClient, setIsClient] = useState(false);
    const [nome, setNome] = useState('');
    const [sobrenome, setSobrenome] = useState('');
    const [initialDataLoaded, setInitialDataLoaded] = useState(false);
    const [imageSrc, setImageSrc] = useState('https://via.placeholder.com/350x350/');
    const [loading, setLoading] = useState(false);
    const [loadingImg, setLoadingImg] = useState(false);

    const { setReRender } = useUserContext()

    const emailStorage = typeof window !== 'undefined' ? localStorage.getItem('email') || '' : ''
    const initials = emailStorage ? emailStorage.substring(0, 2).toUpperCase() : ''

    useEffect(() => {
        setIsClient(true);
        const handleRightClick = event => {
            event.preventDefault();
            return false;
        };

        const handleKeyDown = event => {
            if (['F12', 'I', 'C', 'J'].includes(event.key) && (event.ctrlKey && event.shiftKey)) {
                event.preventDefault();
                return false;
            }
        };

        document.addEventListener('contextmenu', handleRightClick);
        document.addEventListener('keydown', handleKeyDown);

        const detectDevToolsOpen = () => {
            const threshold = 160;
            if (window.outerHeight - window.innerHeight > threshold || window.outerWidth - window.innerWidth > threshold) {
                localStorage.removeItem('sessionValidityPeriod');
                localStorage.removeItem('email');
                navigate.push('/');
            }
        };

        window.addEventListener('resize', detectDevToolsOpen);

        const expiryDate = localStorage.getItem('sessionValidityPeriod');
        if (expiryDate) {
            const currentDate = new Date();
            const expirationDate = new Date(expiryDate);
            if (currentDate > expirationDate) {
                localStorage.removeItem('sessionValidityPeriod');
                localStorage.removeItem('email');
                navigate.push('/');
            }
        } else {
            navigate.push('/');
        }

        return () => {
            document.removeEventListener('contextmenu', handleRightClick);
            document.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('resize', detectDevToolsOpen);
        };
    }, [navigate]);

    useEffect(() => {
        if (email && !initialDataLoaded) {
            const storedUserData = localStorage.getItem('userData');

            if (storedUserData) {
                const userData = JSON.parse(storedUserData);
                setNome(userData.nome || '');
                setSobrenome(userData.sobrenome || '');
                setImageSrc(userData.imageSrc || `https://via.placeholder.com/350x350/`);
                setInitialDataLoaded(true);
            } else {
                // Carregar dados do Firestore
                const loadUserData = async () => {
                    try {
                        const docRef = doc(db, 'users', email);
                        const docSnap = await getDoc(docRef);

                        if (docSnap.exists()) {
                            const userData = docSnap.data();
                            setNome(userData.nome || '');
                            setSobrenome(userData.sobrenome || '');
                            setImageSrc(userData.imageSrc || `https://via.placeholder.com/350x350/`);
                            localStorage.setItem('userData', JSON.stringify(userData));
                        }
                        setInitialDataLoaded(true);
                    } catch (error) {
                        console.error('Error fetching user data: ', error);
                    }
                };

                loadUserData();
            }
        }
    }, [email, initialDataLoaded]);

    const getColor = (letter) => {
        const charCode = letter.toUpperCase().charCodeAt(0) - 64;
        if (charCode >= 1 && charCode <= 5) return '1D4FD8';
        if (charCode >= 6 && charCode <= 10) return 'ffa925';
        if (charCode >= 11 && charCode <= 15) return '7D23CE';
        if (charCode >= 16 && charCode <= 20) return '168142';
        return 'bg-red-700';
    };

    const backgroundColor = emailStorage ? getColor(emailStorage.charAt(0)) : 'bg-gray-300';

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);
        const userData = { nome, sobrenome, imageSrc };

        if (initialDataLoaded) {
            // Atualizar documento existente
            await updateDocument(email, userData);
            localStorage.setItem('userData', JSON.stringify(userData));
            setLoading(false);
            setReRender((prev) => !prev);
        } else {
            // Criar novo documento
            await addDocument(email, userData);
            localStorage.setItem('userData', JSON.stringify(userData));
            setLoading(false);
        }
    };

    const handleImageChange = async (e) => {
        const file = e.target.files[0];
        if (file) {
            try {
                // Upload da imagem para o Firebase Storage
                const downloadURL = await uploadToStorage(file, 'profileImages', email);
                // Atualizar a imagem de perfil com a URL obtida após o upload
                setImageSrc(downloadURL);
                // Atualizar o localStorage com a nova imagem
                const updatedUserData = { ...JSON.parse(localStorage.getItem('userData')), imageSrc: downloadURL };
                localStorage.setItem('userData', JSON.stringify(updatedUserData));
                // Atualizar o Firestore com a nova imagem
                await updateDocument(email, { imageSrc: downloadURL });
                setReRender((prev) => !prev)
            } catch (error) {
                console.error('Error uploading image: ', error);
            }
        }
    };

    return !isClient
        ? <h1 className='bg-[#110E0F] w-full h-screen text-white font-bold text-3xl titleForm text-center flex justify-center items-center'>Carregando...</h1>
        : (
            <div className="bg-[#110E0F] flex h-screen pb-10 sm:pb-0 container-overflow">
                <Sidebar />
                <div className="w-full ml-0 md:ml-[255px]">
                    <div>
                        <Header />
                        <div className="p-6 pt-4 pb-2 flex flex-col">
                            <input
                                type="file"
                                id="imageUpload"
                                accept="image/*"
                                style={{ display: 'none' }}
                                onChange={handleImageChange}
                            />
                            {
                                loadingImg
                                    ?
                                    ''
                                    :
                                    <img
                                        src={`${imageSrc}${backgroundColor}/FFFFFF?text=${initials}`}
                                        alt="Lucas Katacha"
                                        className="rounded-full ring-[#C4F400] w-16 h-16 mb-2 ring-2 cursor-pointer"
                                        onClick={() => document.getElementById('imageUpload').click()}
                                    />
                            }

                            <h2 className="text-white font-bold mt-4">Perfil</h2>
                            <form onSubmit={handleSubmit} className="w-full mt-2 md:w-[30%]">
                                <div className="flex flex-col">
                                    <p className="text-white">Nome:</p>
                                    <input
                                        type="text"
                                        className="formsText w-full px-4 py-2 bg-white bg-opacity-10 border border-[#C4F400] rounded-sm text-white focus:outline-none focus:border-blue-500"
                                        value={nome}
                                        onChange={(e) => setNome(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col mt-2">
                                    <p className="text-white">Sobrenome:</p>
                                    <input
                                        type="text"
                                        className="formsText w-full px-4 py-2 bg-white bg-opacity-10 border border-[#C4F400] rounded-sm text-white focus:outline-none focus:border-blue-500"
                                        value={sobrenome}
                                        onChange={(e) => setSobrenome(e.target.value)}
                                    />
                                </div>
                                <div className="flex flex-col mb-4 mt-2">
                                    <p className="text-white">Email:</p>
                                    <input
                                        value={email}
                                        disabled
                                        type="text"
                                        className="formsText hover:cursor-not-allowed w-full px-4 py-2 bg-white bg-opacity-10 border border-[#C4F400] rounded-sm text-white focus:outline-none focus:border-blue-500"
                                    />
                                </div>
                                <button
                                    type="submit"
                                    className="w-full py-2 text-white font-semibold rounded-md bg-gradient-to-tr from-[#374500] to-[#C4F400] focus:outline-none focus:ring-2 focus:ring-blue-500 flex justify-center items-center"
                                >
                                    {
                                        loading ? 'CARREGANDO...' : 'SALVAR'
                                    }
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
};

export default Configuracoes;
