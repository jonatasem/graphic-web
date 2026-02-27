'use client';
import { useState, useMemo } from 'react';
import { comments } from '@/components/comments';
import { Filters } from '@/types';
import Header from '@/components/Header';
import Dashboard from '@/components/Dashboard';
import Footer from '@/components/Footer';

export default function Home() {
    // Estado inicial dos filtros
    const [filters, setFilters] = useState<Filters>({
        unidad: "",
        professional: "",
        rating: ""
    });

    // Lógica de filtragem memoizada para performance
    const filteredComments = useMemo(() => {
        return comments.filter(comment => {
            const matchesUnidad = !filters.unidad || comment.unidad === filters.unidad;
            const matchesProfessional = !filters.professional || comment.professional === filters.professional;
            const matchesRating = !filters.rating || comment.rating === filters.rating;
            
            return matchesUnidad && matchesProfessional && matchesRating;
        });
    }, [filters]);

    return (
        <main className="min-h-screen bg-gray-50 p-4 md:p-8 flex flex-col gap-6 max-w-7xl mx-auto">
            <Header setFilters={setFilters} />
            
            {/* O Dashboard agora recebe o array filtrado */}
            <Dashboard comments={filteredComments} />
            
            <Footer comments={filteredComments} />
        </main>
    );
}