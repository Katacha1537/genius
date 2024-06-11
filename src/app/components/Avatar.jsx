import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react';

const Avatar = ({ name }) => {
    const [dropdownVisible, setDropdownVisible] = useState(false);
    const router = useRouter();

    const email = localStorage.getItem('email') || '';

    const getColor = (letter) => {
        const charCode = letter.toUpperCase().charCodeAt(0) - 64;
        if (charCode >= 1 && charCode <= 5) return 'bg-blue-700';
        if (charCode >= 6 && charCode <= 10) return 'bg-yellow-700';
        if (charCode >= 11 && charCode <= 15) return 'bg-purple-700';
        if (charCode >= 16 && charCode <= 20) return 'bg-green-700';
        return 'bg-red-700';
    };

    const initials = email ? email.substring(0, 2).toUpperCase() : '';
    const backgroundColor = email ? getColor(email.charAt(0)) : 'bg-gray-300';

    const toggleDropdown = () => {
        setDropdownVisible(!dropdownVisible);
    };

    const onClickExit = () => {
        localStorage.removeItem('expiryDate');
        localStorage.removeItem('email');
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
                className={`flex items-center justify-center h-10 w-10 rounded-full text-white font-bold cursor-pointer ${backgroundColor}`}
                onClick={(e) => {
                    e.stopPropagation();
                    toggleDropdown();
                }}
            >
                {initials}
            </div>
            {dropdownVisible && (
                <div className="absolute right-0 mt-2 w-28 bg-gray-800 text-white rounded shadow-lg">
                    <Link className='sm:hidden' href='dashboard'>
                        <div className="px-4 py-2 cursor-pointer hover:bg-gray-700 rounded">CRIADORES</div>
                    </Link>
                    <Link className='sm:hidden' href='mentoria'>
                        <div className="px-4 py-2 cursor-pointer hover:bg-gray-700">MENTORIA</div>
                    </Link>
                    <div onClick={onClickExit} className="px-4 py-2 cursor-pointer text-red-500 rounded hover:bg-gray-700">Sair</div>
                </div>
            )}
        </div>
    );
};

export default Avatar;
