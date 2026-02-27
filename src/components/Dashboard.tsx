'use client';
import { useMemo } from "react";
import dynamic from 'next/dynamic';
import RatingComponent from "./Rating";
import { Comment } from "@/types";

const Chart = dynamic(() => import("react-apexcharts"), { ssr: false });

export default function Dashboard({ comments = [] }: { comments: Comment[] }) {
    const chartData = useMemo(() => {
        const ratingsCount = [0, 0, 0, 0, 0]; 
        let notRatedCount = 0;
        comments.forEach(c => {
            const r = parseInt(c.rating);
            if (r >= 1 && r <= 5) ratingsCount[5 - r] += 1;
            else notRatedCount += 1;
        });
        return { series: [{ name: "Avaliações", data: [...ratingsCount, notRatedCount] }] };
    }, [comments]);

    const options: any = {
        chart: { id: "basic-bar", toolbar: { show: false } },
        xaxis: { categories: ["5.0", "4.0", "3.0", "2.0", "1.0", "N.A"] },
        plotOptions: { bar: { horizontal: true } },
        colors: ["#ffa500"]
    };

    return (
        <main className="flex justify-between w-[90%] mx-auto mt-[1.5rem]">
            {/* Lista de Avaliações (200px fixo como no SASS) */}
            <article className="w-full max-w-[200px] max-[768px]:max-w-[150px] max-[599px]:max-w-[120px]">
                <h2 className="mb-[1.5rem] text-[18px] font-bold max-[599px]:text-[16px]">
                    {comments.length} Avaliações
                </h2>
                <ul className="list-none">
                    {[5, 4, 3, 2, 1].map(num => (
                        <li key={num} className="flex items-center text-[16px] mb-[1.2rem] pb-[1.05rem] border-b border-[#c0c0c0ad] max-h-[25px]">
                            <strong className="mr-2">{num}.0</strong>
                            <RatingComponent rating={num} />
                        </li>
                    ))}
                    <li className="flex items-center text-[16px] whitespace-nowrap">
                        <strong>Não Avaliaram</strong>
                    </li>
                </ul>
            </article>

            {/* Gráfico (Calculado como no SASS) */}
            <article className="w-[calc(100%-200px-1.5rem)] max-[1099px]:w-[calc(100%-200px-0.5rem)] max-[899px]:w-[calc(100%-200px)] max-[768px]:w-[calc(100%-150px)]">
                <Chart options={options} series={chartData.series} type="bar" width="100%" height="330" />
            </article>
        </main>
    );
}
