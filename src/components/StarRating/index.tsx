import { FaStar, FaRegStar } from "react-icons/fa";
import './index.scss'

interface StarRatingProps {  // Alterado 'StarRankingProps' para 'StarRatingProps'
    score: number;
}

export default function StarRating({score}: StarRatingProps) {  // Alterado 'StarRanking' para 'StarRating'
    const numberStars = Math.round(score / 2);
    const fullStars = Array(numberStars).fill(0);
    const emptyStars = Array(5 - numberStars).fill(0);

    return (
        <div className="card-ranking">
            {fullStars.map((_, index) => (
                <FaStar key={index} />
            ))}
            {emptyStars.map((_, index) => (
                <FaRegStar key={index} />
            ))}
        </div>
    )
}
