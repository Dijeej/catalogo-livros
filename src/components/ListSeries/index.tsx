'use client';

import axios from 'axios';
import './index.scss'
import { useEffect, useState, useCallback } from 'react';
import { Serie } from '@/types/serie';
import { PulseLoader } from 'react-spinners';
import CardSerie from '../CardSerie';

export default function SeriesList({ genreId }: { genreId?: number }) {
    const [series, setSeries] = useState<Serie[]>([]); 
    const [isLoading, setIsLoading] = useState<boolean>();
    
    const getSeries = useCallback(async () => { 
        setIsLoading(true);
        try {
            const params: Record<string, string | number | undefined> = {
                api_key: '2ad935aa5c1c020c4c3ba741aa80d09d', 
                language: 'pt-BR',
            };

            if (genreId) {
                params.with_genres = genreId;
            }

            const response = await axios.get('https://api.themoviedb.org/3/discover/tv', { params });
            
            setSeries(response.data.results);  
        } catch(error) {
            console.error("Erro ao buscar séries:", error); 
        } finally {
            setIsLoading(false);
        }
    }, [genreId]);

    useEffect(() => {
        getSeries(); 
    }, [getSeries]);

    if (isLoading) {
        return (
            <div className='div-loading'>
                <PulseLoader color='#097674' size={20}/>
            </div>
        )
    }

    return (
        <ul className="list-series">
            {series.map((serie) => 
                <CardSerie key={`serie-${serie.id}`} serie={serie} /> 
            )}
        </ul>
    );
}