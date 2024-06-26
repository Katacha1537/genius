import { useUserContext } from '@/contexts/UserContext';
import { db } from '@/firebase/config';
import { doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

const Avatar = ({ name }) => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const isDashboard = pathname === '/dashboard';
    const isSettings = pathname === '/dashboard/configuracoes';
    const { rerender } = useUserContext();

    const email = typeof window !== 'undefined' ? localStorage.getItem('email') || '' : '';
    const initials = email ? email.substring(0, 2).toUpperCase() : '';

    const [userName, setUserName] = useState('SEM NOME');
    const [userImage, setUserImage] = useState(`https://via.placeholder.com/350x350/`);

    useEffect(() => {
        const storedUserData = localStorage.getItem('userData');

        if (storedUserData) {
            const userData = JSON.parse(storedUserData);
            setUserName(userData.nome || 'SEM NOME');
            setUserImage(userData.imageSrc || `https://via.placeholder.com/350x350/`);
        } else {
            const fetchUserData = async () => {
                try {
                    const docRef = doc(db, 'users', email);
                    const docSnap = await getDoc(docRef);

                    if (docSnap.exists()) {
                        const userData = docSnap.data();
                        setUserName(userData.nome || 'SEM NOME');
                        setUserImage(userData.imageSrc || `https://via.placeholder.com/350x350/`);
                        localStorage.setItem('userData', JSON.stringify(userData));
                    }
                } catch (error) {
                    console.error('Error fetching user data: ', error);
                }
            };

            fetchUserData();
        }
    }, [email, initials, rerender]);

    const getColor = (letter) => {
        const charCode = letter.toUpperCase().charCodeAt(0) - 64;
        if (charCode >= 1 && charCode <= 5) return '1D4FD8';
        if (charCode >= 6 && charCode <= 10) return 'ffa925';
        if (charCode >= 11 && charCode <= 15) return '7D23CE';
        if (charCode >= 16 && charCode <= 20) return '168142';
        return 'bg-red-700';
    };

    const backgroundColor = email ? getColor(email.charAt(0)) : 'bg-gray-300';

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const onClickExit = () => {
        localStorage.removeItem('sessionValidityPeriod');
        localStorage.removeItem('email');
        localStorage.removeItem('userData');
        router.push('/');
    };

    useEffect(() => {
        if (dropdownVisible) {
            window.addEventListener('click', closeDropdown);
        } else {
            window.removeEventListener('click', closeDropdown);
        }
        return () => window.removeEventListener('click', closeDropdown);
    }, [dropdownVisible]);

    const closeDropdown = (e) => {
        if (!e.target.closest('.dropdown-container')) {
            setDropdownVisible(false);
        }
    };

    return (
        <div className="relative dropdown-container">
            <div
                className="flex items-center gap-2 cursor-pointer"
                onClick={(e) => {
                    e.stopPropagation();
                    toggleDropdown();
                }}
            >
                <img
                    src={`${userImage}${backgroundColor}/FFFFFF?text=${initials}`}
                    alt={userName}
                    className={`h-10 w-10 rounded-full border-2 border-[#C4F400] ${backgroundColor}`}
                />
            </div>
            {dropdownVisible && (
                <div className="absolute right-0 mt-2 w-48 bg-gray-800 text-white rounded shadow-lg z-10">
                    <div className="py-1">
                        {isSettings && (
                            <Link href="/dashboard">
                                <div className="block px-4 py-2 cursor-pointer hover:bg-gray-700 rounded">Dashboard</div>
                            </Link>
                        )}
                        {isDashboard && (
                            <Link href="/dashboard/configuracoes">
                                <div className="block px-4 py-2 cursor-pointer hover:bg-gray-700 rounded">Configurações</div>
                            </Link>
                        )}
                        <div
                            onClick={onClickExit}
                            className="block px-4 py-2 cursor-pointer text-red-500 rounded hover:bg-gray-700"
                        >
                            Sair
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Avatar;
