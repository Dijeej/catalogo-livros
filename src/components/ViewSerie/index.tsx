"use client";

import { Serie } from "@/types/serie";
import { Genre } from "@/types/genre";
import axios from "axios";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";
import './index.scss'
import StarRating from "../StarRating";


export default function ViewSerie() {
    const params = useParams();
    const [serie, setSerie] = useState<Serie | null>(null);
    const [genres, setGenres] = useState<Genre[] | null>(null);
    const [numberSeasons, setNumberSeasons] = useState(0);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!params?.id) return;

        async function fetchData() {
            try {
                const response = await axios.get(
                    `https://api.themoviedb.org/3/tv/${params.id}?api_key=2ad935aa5c1c020c4c3ba741aa80d09d&language=pt-BR`
                );
                console.log(response.data);
                console.log(response.data.seasons.length)
                setSerie(response.data);
                setNumberSeasons(response.data.seasons.length);
                setGenres(response.data.genres);
            } catch (error) {
                console.error("Erro ao buscar detalhes da série:", error);
            } finally {
                setLoading(false);
            }
        }

        fetchData();
    }, [params?.id]);

    if (loading) {
        return (
            <div className="div-loading">
                <PulseLoader color="#097674" size={20} />
            </div>
        );
    }

    if (!serie || !genres) {
        return <p>Erro ao carregar os detalhes da série.</p>;
    }

    return (
        <div className='serie-container'>
            <div className="serie-info">
                <h1 className="serie-name">{serie.name}</h1>
                <Image className="serie-image"
                    src={`https://image.tmdb.org/t/p/original${serie.poster_path}`}
                    alt={serie.name}
                    width={500}
                    height={700}
                />
                <div className="serie-rating">
                    {serie.vote_average > 0 &&  
                        <StarRating score={serie.vote_average} />  
                    }
                    <p className="vote-average">{serie.vote_average.toFixed(1)}</p>
                </div>
            </div>
            
            <div className="serie-overview">
                <div className="overview-card">
                    <p>Temporadas: {numberSeasons}</p>
                </div>
                <div className="overview-card">
                    <p>Gêneros:
                        <span> 
                            {genres.map((genre) => (    
                                ` ${genre.name} `
                            ))}
                        </span>
                    </p>
                </div>
                <div className="overview-card">
                    <p>{serie.overview}</p>
                </div>
            </div>
        </div>
    );
}