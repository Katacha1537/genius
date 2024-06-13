import { usePathname } from 'next/navigation';
import Avatar from './Avatar';

const Header = () => {
    const pathname = usePathname();
    const isDashboard = pathname === '/dashboard';
    const isSettings = pathname === '/dashboard/configuracoes';
    return (
        <header className={`flex w-full justify-between items-center p-4 pr-4 md:pl-6 ${isDashboard ? 'md:pr-[21%]' : ''}  text-white`}>
            <h2 className='font-bold text-xl'>{isDashboard ? 'Dashboard' : isSettings ? 'Configurações' : 'Não encontrado'}</h2>
            <Avatar name="felipe" />
        </header>
    );
};

export default Header;
