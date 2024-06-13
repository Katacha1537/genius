import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Link from "next/link";

const MentoriaEcom = () => {
    return (
        <div className="relative mt-4">
            <h3 className="text-lg text-white font-bold text-center sm:text-left">
                Mentoria Ecom
            </h3>
            <div className="flex gap-4">
                <Link href="/mentoria">
                    <div className="mt-2 hover:cursor-pointer rounded-xl mb-2 bg-[url('/assets/mentoriaEcom.png')] bg-cover h-[600px] md:h-[400px] w-[248px]" />
                </Link>
                <InactiveCard imageUrl="/assets/expertEcom.png" />
            </div>
        </div>
    );
};

const InactiveCard = ({ imageUrl }) => {
    return (
        <div className="relative mt-2 hover:cursor-not-allowed rounded-xl mb-2 w-auto h-[600px] md:h-[400px] w-[248px] bg-cover bg-center" style={{ backgroundImage: `url(${imageUrl})` }}>
            <div className="absolute inset-0 bg-[#000] opacity-60 rounded-xl"></div> {/* Camada semi-transparente */}
            <div className="absolute top-3 right-4 bg-purple-600 text-white text-xs px-4 py-2 rounded-full z-10 opacity-100">
                Em breve
            </div>
            <div className="absolute inset-0 rounded-xl pointer-events-none" style={{
                boxShadow: 'inset 0 0 15px 5px rgba(128, 90, 213, 0.5)'
            }}></div> {/* Sombra interna */}
        </div>
    );
};

export default MentoriaEcom;
