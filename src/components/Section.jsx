import './components.css';

const Section = ({ titleUm, titleDois }) => {
    return (
        <div className=''>
            <div className="w-full">
                <div className="relative mb-4 text-center sm:text-left">
                    <h2 className="titleForm text-3xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#4100C8] from-1% to-[#E741E7] to-60% sm:to-10%">{titleUm}</h2>
                    <h2 className="titleForm text-3xl sm:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#4100C8] from-1% to-[#E741E7] to-45% sm:to-15%">{titleDois}</h2>
                </div>
            </div>
        </div>
    );
};

export default Section;
