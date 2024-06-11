import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Avatar from './Avatar';

const Header = () => {
    const pathname = usePathname();
    const isDashboard = pathname === '/dashboard';
    const isMentoria = pathname === '/mentoria';

    return (
        <header className="flex items-center justify-between p-4 pr-11 text-white">
            <img src="https://geniusecom.io/wp-content/uploads/2023/04/Logo-light.svg" alt="Logo" className="w-32 sm:w-40 mb-0 block" />
            <div className='gap-4 hidden sm:flex'>
                <Link href='dashboard'>
                    <p className={`text-${isDashboard ? '[#ffffff]' : '[#aaaaaa]'} text-center titleForm`}>CRIADORES</p>
                </Link>
                <Link href='mentoria'>
                    <p className={`text-${isMentoria ? '[#ffffff]' : '[#aaaaaa]'} hover:text-white text-center titleForm`}>MENTORIA</p>
                </Link>
            </div>
            <Avatar name="felipe" />
        </header>
    );
};

export default Header;
