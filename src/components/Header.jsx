import { usePathname, useRouter } from 'next/navigation';
import { FaChevronLeft } from 'react-icons/fa';
import Avatar from './Avatar';

const Header = () => {
    const pathname = usePathname();
    const navigation = useRouter()
    const isDashboard = pathname === '/dashboard';
    const isSettings = pathname === '/dashboard/configuracoes';
    const isExperts = pathname === '/dashboard/experts';
    return (
        <header className={`flex w-full justify-between items-center p-4 pr-4  ${isSettings ? ' ' : 'md:pr-[270px]'} 2xl:pr-40 3xl:pr-16 text-white`}>
            <h2 className={`font-bold text-xl ${isDashboard ? 'text-left' : ''} ${isSettings ? 'text-center md:text-left' : ''} ${isExperts ? 'text-center md:text-left' : ''}`}>
                {isDashboard ? 'Dashboard' : isSettings ? 'Configurações' : isExperts ? (
                    <div onClick={() => { navigation.push('/dashboard') }} className='flex gap-2 justify-center items-center hover:cursor-pointer'>
                        <FaChevronLeft />
                        Expert's
                    </div>
                ) : 'Não encontrado'}
            </h2>
            <div className="flex-shrink-0">
                <Avatar name="felipe" />
            </div>
        </header>

    );
};

export default Header;
