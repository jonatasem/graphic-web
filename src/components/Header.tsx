'use client';
import { useState } from 'react';
import { FaBars, FaXmark } from 'react-icons/fa6';
export default function Header({ setFilters }: { setFilters: any }) {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const handleFilterChange = (name: string, value: string) => {
        setFilters((prev: any) => ({ ...prev, [name]: value }));
    };

    const selectClass = "w-full md:w-[calc(100%/3-1rem)] p-2 text-[16px] border border-[#bfbfbf7a] rounded-[0.2rem] shadow-[1px_1px_5px_#bfbfbf7a] bg-transparent cursor-pointer outline-none";

    return (
        <header className="w-[90%] mx-auto relative">
            <h1 className="text-[25px] font-bold my-4 md:text-[20px] max-[768px]:my-[1.5rem_0_2.5rem]">Avaliações</h1>
            
            {/* Nav Desktop */}
            <nav className="hidden md:flex justify-between w-[80%] max-[899px]:w-[90%] gap-4">
                <select className={selectClass} onChange={(e) => handleFilterChange('unidad', e.target.value)}>
                    <option value="">Unidades</option>
                    <option value="Unidade A">Unidade A</option>
                    <option value="Unidade B">Unidade B</option>
                    <option value="Unidade C">Unidade C</option>
                </select>

                <select className={selectClass} onChange={(e) => handleFilterChange('professional', e.target.value)}>
                    <option value="">Profissionais</option>
                    <option value="Maria Silva">Maria Silva</option>
                    <option value="João Pereira">João Pereira</option>
                </select>

                <select className={selectClass} onChange={(e) => handleFilterChange('rating', e.target.value)}>
                    <option value="">Notas</option>
                    <option value="5">5.0</option>
                    <option value="4">4.0</option>
                    <option value="3">3.0</option>
                    <option value="2">2.0</option>
                    <option value="1">1.0</option>
                    <option value="N. A">Não Avaliaram</option>
                </select>
            </nav>

            {/* Icon Mobile */}
            <div className="absolute top-[10px] right-[10px] md:hidden block cursor-pointer">
                {isMenuOpen ? 
                    <FaXmark className="text-[32px]" onClick={() => setIsMenuOpen(false)} /> : 
                    <FaBars className="text-[32px]" onClick={() => setIsMenuOpen(true)} />
                }
            </div>

            {/* Menu Mobile Lateral */}
            <div className={`fixed top-0 transition-all duration-300 w-[80%] p-4 min-h-[900px] bg-white z-[5] shadow-2xl ${isMenuOpen ? 'left-0' : 'left-[-100%]'}`}>
                <nav className="flex flex-col gap-4 mt-6">
                    <select className="p-2 border border-silver rounded-lg" onChange={(e) => {handleFilterChange('unidad', e.target.value); setIsMenuOpen(false)}}>
                    <option value="">Unidades</option>
                    <option value="Unidade A">Unidade A</option>
                    <option value="Unidade B">Unidade B</option>
                    <option value="Unidade C">Unidade C</option>
                    </select>
                </nav>
            </div>
        </header>
    );
}