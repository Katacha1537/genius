import Link from "next/link";

const CriadorProdutosEcom = () => {
    return (
        <div className="relative mt-4">
            <h3 className="text-lg text-white font-bold text-left">
                CRIADOR DE PRODUTOS
            </h3>
            <div className="flex justify-start ">
                <Link href="/criador-de-produtos">
                    <div
                        className="mt-2 hover:cursor-pointer rounded-xl mb-2 bg-cover bg-center h-[236px] w-[135px] md:h-[450px] md:w-[248px]"
                        style={{ backgroundImage: "url('/assets/criadorEcom.webp')", backgroundSize: 'contain' }}
                    />
                </Link>
                <div className="mt-2 hidden md:block rounded-xl  bg-cover h-[600px] md:h-[400px] w-[350px]" />
            </div>
        </div>
    );
};

export default CriadorProdutosEcom;
