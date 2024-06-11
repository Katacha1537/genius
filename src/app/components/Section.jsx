import './components.css';

const Section = () => {
    return (
        <div className='mb-1'>
            <div className="w-full">
                <div className="relative mb-4 text-center sm:text-left">
                    <h2 className="titleForm text-3xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#4100C8] from-1% to-[#E741E7] to-60% sm:to-10%">CRIE EM UM</h2>
                    <h2 className="titleForm text-3xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#4100C8] from-1% to-[#E741E7] to-45% sm:to-15%">PASSE DE MÁGICA</h2>
                </div>
                <p className="text-[#D8DBE3] text-md formsText sm:text-left text-center sm:w-[32%]">A Genius é o cérebro que automatiza de forma inteligente cada etapa crucial do seu projeto em apenas poucos cliques.</p>
            </div>
        </div>
    );
};

export default Section;
