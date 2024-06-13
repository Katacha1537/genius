import { SiWhatsapp } from "react-icons/si";

const WhatsAppButton = () => {
    const handleWhatsAppClick = () => {
        // Construa a URL do WhatsApp com o número e a mensagem
        const url = `http://suporte.jeffecom.com`;

        // Redireciona para a URL do WhatsApp
        window.location.href = url;
    };

    return (
        <div style={{
            position: 'fixed',
            bottom: '20px',
            right: '20px',
            zIndex: '1000', // Coloca o botão acima de outros elementos
        }}>
            <button
                onClick={handleWhatsAppClick}
                className="bg-[#25D366] text-white rounded-full w-16 h-16 text-4xl font-bold hover:cursor-pointer flex justify-center items-center"
            >
                <SiWhatsapp />
            </button>
        </div>
    );
};

export default WhatsAppButton;
