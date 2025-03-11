import { Serie } from '@/types/serie';
import Image from 'next/image';
import StarRating from '../StarRating';
import './index.scss'

interface CardSerieProps {  
    serie: Serie;
}

export default function CardSerie({serie}: CardSerieProps) { 
    return (
        <li className='card-serie'>  
            <div className='card-poster'>
                <Image
                    className="card-image"
                    src={`https://image.tmdb.org/t/p/original${serie.poster_path}`}  
                    alt={`${serie.title}`}  
                    width={500} 
                    height={700}
                    layout='intrinsic'
                />
            </div>
            <div className='card-infos'>
                <p className='card-title'> {serie.title} </p>  

                {serie.vote_average > 0 &&  
                    <StarRating score={serie.vote_average} />  
                }
                
                <div className='hidden-content'>
                    {serie.overview &&  
                        <p className='card-description'> 
                            {serie.overview.length > 100
                                ? `${serie.overview.substring(0, 100)}...`  
                                : serie.overview 
                            } 
                        </p>
                    }
                    <button className='btn-default'>Ver mais</button>
                </div>
            </div>
        </li>
    )
}
