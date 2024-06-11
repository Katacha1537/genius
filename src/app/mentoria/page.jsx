'use client'
import Header from "../components/Header";
import SectionMentoria from "../components/SectionMentoria";
import CorouselMentoria from "../components/CorouselMentoria";

export default function Home() {
    return (
        <div className="bg-[#0B060F] h-screen flex flex-col pb-10 sm:pb-0">
            <Header />
            <div className="flex-grow sm:bg-custom-gradient">
                <main className="p-12 pt-2 pb-2 flex flex-col justify-end h-full">
                    <SectionMentoria />
                    <CorouselMentoria />
                </main>
            </div>
        </div>
    )
}
