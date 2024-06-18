// // import React from "react";
// // import "./MovieCard.css"
// // const MovieCard = ({movie}) => {
// // return (
// //     <>
// //     <div className= "moviecard-container">

        
// //         <img src= {movie.movieImage}/>
// //         <h2>{movie.movieTitle}</h2>
// //         <h2>{`Rating: ${movie.movieRating}`}</h2>
    
   


// //     </div>
    
    
    
// //     </>


// // );




// // };

// // export default MovieCard;
// import React from "react";
// import "./MovieCard.css";

// const MovieCard = ({movieTitle, movieImage,movieRating}) => {
//   return (
//     <div className="moviecard-container">
//       <img src={movieImage} alt={`${movie.movieTitle} poster`} />
//       <h3>{movieTitle}</h3>
//       <h2>{`Rating: ${movie.movieRating}`}</h2>
//     </div>
//   );
// };

// export default MovieCard;


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