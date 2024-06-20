
import React from "react";
import "./MovieCard.css";

const MovieCard = ({ movieTitle, movieImage, movieRating, onClick }) => {
return (
<div className="moviecard-container" onClick={onClick}>
<img src={movieImage} alt={`${movieTitle} poster`} />
<h3>{movieTitle}</h3>
<h2>{`Rating: ${movieRating}`}</h2>
</div>

)
};

export default MovieCard;