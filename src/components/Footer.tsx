'use client';
import { useState } from 'react';
import RatingComponent from './Rating';
import { Comment } from '@/types';

export default function Footer({ comments }: { comments: Comment[] }) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [selected, setSelected] = useState<Comment | null>(null);
    const perPage = 3;

    const displayed = comments.slice(currentIndex, currentIndex + perPage);

    return (
        <footer className="w-full mt-8">
            {/* Tabela Desktop */}
            <table className="hidden md:table w-[90%] mx-auto border-separate border-spacing-0 border border-[#c0c0c080] rounded-[0.5rem] overflow-hidden">
                <thead className="bg-transparent">
                    <tr>
                        {["Data", "Contato", "Avaliação", "Profissional", "Unidade"].map(h => (
                            <th key={h} className="p-[0.2rem] text-[16px] font-bold border-b border-r border-[#c0c0c0d8] last:border-r-0 text-center">{h}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {displayed.map((c, i) => (
                        <tr key={i} className="hover:bg-whitesmoke cursor-pointer">
                            <td className="p-[0.2rem] border-b border-r border-[#c0c0c0d8] last:border-r-0 text-center">{c.date}</td>
                            <td className="p-[0.2rem] border-b border-r border-[#c0c0c0d8] last:border-r-0 text-center">{c.contact}</td>
                            <td className="p-[0.2rem] border-b border-r border-[#c0c0c0d8] last:border-r-0 flex justify-center"><RatingComponent rating={c.rating}/></td>
                            <td className="p-[0.2rem] border-b border-r border-[#c0c0c0d8] last:border-r-0 text-center">{c.professional}</td>
                            <td className="p-[0.2rem] border-b border-r border-[#c0c0c0d8] last:border-r-0 text-center">{c.unidad}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {/* Tabela Mobile */}
            <div className="md:hidden w-full p-4">
                <table className="w-full border border-[#c0c0c080]">
                    <thead>
                        <tr>
                            <th className="text-left p-1 border border-[#c0c0c0d8]">Data</th>
                            <th className="text-center p-1 border border-[#c0c0c0d8]">Avaliação</th>
                            <th className="text-right p-1 border border-[#c0c0c0d8]">Ver mais</th>
                        </tr>
                    </thead>
                    <tbody>
                        {displayed.map((c, i) => (
                            <tr key={i}>
                                <td className="p-1 border border-[#c0c0c0d8]">{c.date}</td>
                                <td className="p-1 border border-[#c0c0c0d8] text-center"><RatingComponent rating={c.rating}/></td>
                                <td className="p-1 border border-[#c0c0c0d8] text-right">
                                    <button onClick={() => setSelected(c)} className="bg-orange-500 text-white font-extrabold px-2 py-1 rounded-[0.2rem] text-sm">Detalhes</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Controles de Página */}
            <div className="w-[90%] mx-auto flex justify-end gap-2 mt-4">
                <button onClick={() => setCurrentIndex(Math.max(0, currentIndex-perPage))} className="cursor-pointer p-1 border border-silver">Anterior</button>
                <button onClick={() => setCurrentIndex(currentIndex+perPage)} className="cursor-pointer p-1 border border-silver">Próximo</button>
            </div>
            <div className="w-[90%] mx-auto text-right mb-4">
                Página {Math.floor(currentIndex/perPage)+1} de {Math.ceil(comments.length/perPage)}
            </div>

            {/* Popup (Modal) */}
            {selected && (
                <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-[10]">
                    <div className="bg-white p-5 rounded-lg w-[90%] max-w-[500px] relative shadow-lg">
                        <button onClick={() => setSelected(null)} className="absolute top-2 right-2 text-xl">✕</button>
                        <h3 className="font-bold mb-4">Detalhes do Comentário</h3>
                        <p><strong>Data:</strong> {selected.date}</p>
                        <p><strong>Contato:</strong> {selected.contact}</p>
                        <p className="flex items-center"><strong>Avaliação:</strong> <RatingComponent rating={selected.rating}/></p>
                    </div>
                </div>
            )}
        </footer>
    );
}