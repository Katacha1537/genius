import Link from "next/link";

const CriadorProdutosEcom = () => {
    return (
        <div className="relative mt-4">
            <h3 className="text-lg text-white font-bold text-left">
                CRIADOR DE PRODUTOS
            </h3>
            <div className="flex justify-start ">
                <Link href="/criador-de-produtos">
                    <div className="mt-2 hover:cursor-pointer rounded-xl mb-2 bg-[url('/assets/criadorEcom.webp')] bg-cover h-[300px] w-[175px] md:h-[400px] md:w-[248px]" />
                </Link>
                <div className="mt-2 hidden md:block rounded-xl  bg-cover h-[600px] md:h-[400px] w-[350px]" />
            </div>
        </div>
    );
};

export default CriadorProdutosEcom;
