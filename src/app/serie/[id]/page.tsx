import Image from 'next/image';
import { notFound } from 'next/navigation';

interface SerieDetails {
    id: number;
    name: string;
    overview: string;
    poster_path: string;
    vote_average: number;
}

async function getSerieDetails(id: string): Promise<SerieDetails | null> {
    try {
        const response = await fetch(
            `https://api.themoviedb.org/3/tv/${id}?api_key=2ad935aa5c1c020c4c3ba741aa80d09d&language=pt-BR`
        );

        if (!response.ok) return null;

        return response.json();
    } catch (error) {
        console.error("Erro ao buscar detalhes da série:", error);
        return null;
    }
}

export default async function SeriePage({ params }: { params: { id: string } }) {
    const serie = await getSerieDetails(params.id);

    if (!serie) return notFound(); // Retorna uma página 404 caso não encontre a série

    return (
        <div className="serie-container">
            <h1>{serie.name}</h1>
            <Image 
                src={`https://image.tmdb.org/t/p/original${serie.poster_path}`}
                alt={serie.name}
                width={500}
                height={750}
            />
            <p>{serie.overview}</p>
            <p>⭐ {serie.vote_average.toFixed(1)}</p>
        </div>
    );
}