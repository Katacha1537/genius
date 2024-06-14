'use client'
import { useRouter } from "next/navigation"
import { useEffect } from "react";

export default function Mentoria() {
    const navigate = useRouter()

    useEffect(() => {
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
                localStorage.removeItem('expiryDate')
                localStorage.removeItem('email')
                navigate.push('/'); // Redireciona para a página inicial ou qualquer outra página
            }
        };

        window.addEventListener('resize', detectDevToolsOpen);

        // Verifica a expiração do token
        const expiryDate = localStorage.getItem('expiryDate');
        if (expiryDate) {
            const currentDate = new Date();
            const expirationDate = new Date(expiryDate);
            if (currentDate > expirationDate) {
                localStorage.removeItem('expiryDate');
                localStorage.removeItem('email');
                navigate.push('/');
            }
        } else {
            navigate.push('/');
        }

        // Remove os listeners ao desmontar
        return () => {
            document.removeEventListener('contextmenu', handleRightClick);
            document.removeEventListener('keydown', handleKeyDown);
            window.removeEventListener('resize', detectDevToolsOpen);
        };
    }, [navigate]);

    return (
        <div style={{ width: '100%', height: '100vh' }} className="bg-custom-purple">
            <iframe
                src="https://chat.comunidadeecom.com/monitor-espionagem-l35y7r1m"
                style={{ border: 'none', width: '100%', height: '100%' }}
                title="Monitor - Espionagem"
            >

            </iframe>
        </div>
    )
}