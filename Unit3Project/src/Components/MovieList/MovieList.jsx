// import React, { useState, useEffect } from "react";
// import MovieCard from "../MovieCard/MovieCard";
// import "./MovieList.css"; 
// import Modal from "../Modal/Modal";
// function MovieList() {
//   const [data, setMovieData] = useState([]);
//   const [selectedMovie, setSelectedMovie] = useState(null); 
//   const [searchTerm, setSearchTerm] = useState("");


//   const loadMoreMovies = () => {
//     setPage((prevPage) => prevPage + 1);
//     console.log("Loading more movies, page:", page + 1); 
//     if (activeView === "nowPlaying") {
//         fetchMovies(page + 1);
//     } else if (activeView === "search") {
//         searchMovies(page + 1);
//     }
// };


//   const fetchData = async () => {
//     try {
//       const apiKey = import.meta.env.VITE_API_KEY;
//       const response = await fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page={page}`);

//       if (!response.ok) {
//         throw new Error('Whoops, failed to fetch movie data');
//       }

//       const data = await response.json();
//       setMovieData(data.results);
//     } catch (error) {
//       console.error(error);
//     }
//   };

//   useEffect(() => {
//     fetchData();
//   }, []);

//   // Filter the movies based on the search term
//   const filteredMovies = data.filter(movie =>
//     movie.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <>
//       <div className="search-container">
//         <input
//           type="text"
//           placeholder="Search movies..."
//           value={searchTerm}
//           onChange={(e) => setSearchTerm(e.target.value)}
//         />
//       </div>

//       <div className="movieList-container">
//         {filteredMovies.map((movie) => (
//           <div
//             className="movie-item"
//             key={movie.id}
//           >
//             <MovieCard
//             //key={movie.id}
//               movieTitle={movie.title}
//               movieImage={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//               movieRating={movie.vote_average}
//               onClick={() => setSelectedMovie(movie)}
//             />

//           </div>
//         ))}
//         {loading && <p>Loading...</p>}
//             {!loading && movies.length > 0 && (
//                 <button onClick={loadMoreMovies} className="load-more">
//                     Load More
//                 </button>
//             )}
//             {!loading && movies.length === 0 && (
//                 <p>No movies found</p>
//             )}
//       </div>


// {selectedMovie && (
//         <Modal

//           show={selectedMovie !== null}
//           onClose={() => setSelectedMovie(null)}
//         >
//           <h2>{selectedMovie.movieTitle}</h2>
//           <img src={`https://image.tmdb.org/t/p/w500${selectedMovie.backdrop_path}`}/>
//           <p> Release Data: {selectedMovie.release_date}
//           </p>
//           <p> Overview: {selectedMovie.overview}
//           </p>

//         </Modal>
//       )}



//     </>
//   );
// }

// export default MovieList;

//  {/* {selectedMovie && (
//       <
//         <div className="selected-movie">
//           <h2>{selectedMovie.name}</h2>
//           <MovieCard
//             movieTitle={selectedMovie.title}
//             movieImage={`https://image.tmdb.org/t/p/w500${selectedMovie.poster_path}`}
//             movieRating={selectedMovie.vote_average}
//           />
//         </div>
//       )}  */}




import React, { useState, useEffect } from "react";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieList.css";
import Modal from "../Modal/Modal";

function MovieList() {
  const [data, setMovieData] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const fetchMovies = async (pageNum = 1) => {
    setLoading(true);
    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${pageNum}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Whoops, failed to fetch movie data');
      }

      const data = await response.json();
      setMovieData(prevData => (pageNum === 1 ? data.results : [...prevData, ...data.results]));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const searchMovies = async (searchTerm, pageNum = 1) => {
    setLoading(true);
    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}&page=${pageNum}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Whoops, failed to fetch search results');
      }

      const data = await response.json();
      setMovieData(prevData => (pageNum === 1 ? data.results : [...prevData, ...data.results]));
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (searchTerm) {
      searchMovies(searchTerm, page);
    } else {
      fetchMovies(page);
    }
  }, [page]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const submittedData = event.target.elements.searchInput.value;
    setSearchTerm(submittedData);
    setPage(1);
    setMovieData([]);
    searchMovies(submittedData, 1);
  };

  const filteredMovies = data.filter(movie =>
    movie.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <div className="search-container">
        <form onSubmit={handleSearchSubmit}>
          <input
            type="text"
            name="searchInput"
            placeholder="Search movies..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>

      <div className="movieList-container">
        {filteredMovies.map((movie) => (
          <div
            className="movie-item"
            key={movie.id}
            onClick={() => setSelectedMovie(movie)}
          >
            <MovieCard
              movieTitle={movie.title}
              movieImage={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
              movieRating={movie.vote_average}
            />
          </div>
        ))}
      </div>

      {loading && <p>Loading...</p>}
      {!loading && filteredMovies.length > 0 && (
        <button onClick={handleLoadMore} className="load-more">
          Load More
        </button>
      )}
      {!loading && filteredMovies.length === 0 && (
        <p>No movies found</p>
      )}

      {selectedMovie && (
        <Modal
          show={selectedMovie !== null}
          onClose={() => setSelectedMovie(null)}
        >
          <h2>{selectedMovie.title}</h2>
          <img src={`https://image.tmdb.org/t/p/w500${selectedMovie.backdrop_path}`} alt={`${selectedMovie.title} backdrop`} />
          <p>Release Date: {selectedMovie.release_date}</p>
          <p>Overview: {selectedMovie.overview}</p>
        </Modal>
      )}
    </>
  );
}

export default MovieList;
