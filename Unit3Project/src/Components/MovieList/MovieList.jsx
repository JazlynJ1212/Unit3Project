// import React, { useState, useEffect } from "react";
// import MovieCard from "../MovieCard/MovieCard";
// import "./MovieList.css";
// import Modal from "../Modal/Modal";
// import Dropdown from "../SortDropdown/Dropdown";




// function MovieList() {
//   const [data, setMovieData] = useState([]);
//   const [selectedMovie, setSelectedMovie] = useState(null);
//   const [page, setPage] = useState(1);
//   const [loading, setLoading] = useState(false);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [sortOption, setSortOption]= useState("")

//   const fetchMovies = async (pageNum = 1) => {
//     setLoading(true);
//     try {
//       const apiKey = import.meta.env.VITE_API_KEY;
//       const url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${pageNum}`;
//       const response = await fetch(url);

//       if (!response.ok) {
//         throw new Error('Whoops, failed to fetch movie data');
//       }

//       const data = await response.json();
//       setMovieData(prevData => (pageNum === 1 ? data.results : [...prevData, ...data.results]));
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };


 


//   const searchMovies = async (searchTerm, pageNum = 1) => {
//     setLoading(true);
//     try {
//       const apiKey = import.meta.env.VITE_API_KEY;
//       const url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${searchTerm}&page=${pageNum}`;
//       const response = await fetch(url);

//       if (!response.ok) {
//         throw new Error('Whoops, failed to fetch search results');
//       }

//       const data = await response.json();
//       setMovieData(prevData => (pageNum === 1 ? data.results : [...prevData, ...data.results]));
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     if (searchTerm) {
//       searchMovies(searchTerm, page);
//     } else {
//       fetchMovies(page);
//     }
//   }, [page]);

//   const handleLoadMore = () => {
//     setPage(prevPage => prevPage + 1);
//   };

//   const handleSearchSubmit = (event) => {
//     event.preventDefault();
//     const submittedData = event.target.elements.searchInput.value;
//     setSearchTerm(submittedData);
//     setPage(1);
//     setMovieData([]);
//     searchMovies(submittedData, 1);
//   };

//   const filteredMovies = data.filter(movie =>
//     movie.title.toLowerCase().includes(searchTerm.toLowerCase())
//   );

//   return (
//     <>
//       <div className="search-container">
//         <form onSubmit={handleSearchSubmit}>
//           <input
//             type="text"
//             name="searchInput"
//             placeholder="Search movies..."
//             value={searchTerm}
//             onChange={(e) => setSearchTerm(e.target.value)}
//           />
//           <button type="submit">Search</button>
//         </form>
//       </div>

//       <div className="movieList-container">
//         {filteredMovies.map((movie) => (
//           <div
//             className="movie-item"
//             key={movie.id}
//             onClick={() => setSelectedMovie(movie)}
//           >
//             <MovieCard
//               movieTitle={movie.title}
//               movieImage={`https://image.tmdb.org/t/p/w500${movie.poster_path}`}
//               movieRating={movie.vote_average}
//             />
//           </div>
//         ))}
//       </div>

//       {loading && <p>Loading...</p>}
//       {!loading && filteredMovies.length > 0 && (
//         <button onClick={handleLoadMore} className="load-more">
//           Load More
//         </button>
//       )}
//       {!loading && filteredMovies.length === 0 && (
//         <p>No movies found</p>
//       )}

//       {selectedMovie && (
//         <Modal
//           show={selectedMovie !== null}
//           onClose={() => setSelectedMovie(null)}
//         >
//           <h2>{selectedMovie.title}</h2>
//           <img src={`https://image.tmdb.org/t/p/w500${selectedMovie.backdrop_path}`} alt={`${selectedMovie.title} backdrop`} />
//           <p>Release Date: {selectedMovie.release_date}</p>
//           <p>Overview: {selectedMovie.overview}</p>
//         </Modal>
//       )}
//     </>
//   );
// }

// export default MovieList;
import React, { useState, useEffect, useMemo } from "react";
import MovieCard from "../MovieCard/MovieCard";
import "./MovieList.css";
import Modal from "../Modal/Modal";
import Dropdown from "../SortDropdown/Dropdown";

function MovieList() {
  const [data, setMovieData] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState(null);
  const [selectedMovieDetails, setSelectedMovieDetails] = useState(null);
  const [page, setPage] = useState(1);
  const [loading, setLoading] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOption, setSortOption] = useState("");
  const [activeView, setActiveView] = useState("nowPlaying");

  const fetchMovies = async (pageNum = 1, sort = "") => {
    setLoading(true);
    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      let url = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&page=${pageNum}`;
      if (sort) {
        url += `&sort_by=${sort}`;
      }
      console.log("Fetching movies with URL:", url);  // Debug log
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

  const fetchMovieDetails = async (movieId) => {
    setLoading(true);
    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      const url = `https://api.themoviedb.org/3/movie/${movieId}?api_key=${apiKey}&append_to_response=genres`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error('Whoops, failed to fetch movie details');
      }

      const data = await response.json();
      setSelectedMovieDetails(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const searchMovies = async (searchTerm, pageNum = 1, sort = "") => {
    setLoading(true);
    try {
      const apiKey = import.meta.env.VITE_API_KEY;
      let url = `https://api.themoviedb.org/3/search/movie?api_key=${apiKey}&query=${encodeURIComponent(searchTerm)}&page=${pageNum}`;
      if (sort) {
        url += `&sort_by=${sort}`;
      }
      console.log("Searching movies with URL:", url);  // Debug log
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
    if (activeView === "search" && searchTerm) {
      searchMovies(searchTerm, page, sortOption);
    } else if (activeView === "nowPlaying") {
      fetchMovies(page, sortOption);
    }
  }, [page, sortOption, activeView, searchTerm]);

  const handleLoadMore = () => {
    setPage(prevPage => prevPage + 1);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    const submittedData = event.target.elements.searchInput.value;
    setSearchTerm(submittedData);
    setPage(1);
    setMovieData([]);
    searchMovies(submittedData, 1, sortOption);
  };

  const handleSortChange = (event) => {
    const sort = event.target.value;
    setSortOption(sort);
    setPage(1);
    setMovieData([]);
    if (activeView === "search" && searchTerm) {
      searchMovies(searchTerm, 1, sort);
    } else {
      fetchMovies(1, sort);
    }
  };

  const handleViewChange = (view) => {
    setActiveView(view);
    setPage(1);
    setMovieData([]);
    if (view === "nowPlaying") {
      setSearchTerm("");
      setSortOption(""); // Reset sort option for now playing
      fetchMovies(1, "");
    }
  };

  const handleMovieSelect = (movie) => {
    setSelectedMovie(movie);
    fetchMovieDetails(movie.id);
  };

  const sortedMovies = useMemo(() => {
    const sorted = [...data];
    switch (sortOption) {
      case 'original_title.asc':
        sorted.sort((a, b) => a.title.localeCompare(b.title));
        break;
      case 'release_date.asc':
        sorted.sort((a, b) => new Date(a.release_date) - new Date(b.release_date));
        break;
      case 'release_date.desc':
        sorted.sort((a, b) => new Date(b.release_date) - new Date(a.release_date));
        break;
      case 'vote_average.desc':
        sorted.sort((a, b) => b.vote_average - a.vote_average);
        break;
      default:
        break;
    }
    return sorted;
  }, [data, sortOption]);

  return (
    <>
      <div className="view-buttons">
        <button
          className={activeView === "nowPlaying" ? "active" : ""}
          onClick={() => handleViewChange("nowPlaying")}
        >
          Now Playing
        </button>
        <button
          className={activeView === "search" ? "active" : ""}
          onClick={() => handleViewChange("search")}
        >
          Search
        </button>
      </div>

      {activeView === "search" && (
        <div className="search-bar">
          <form onSubmit={handleSearchSubmit}>
            <input
              type="text"
              name="searchInput"
              placeholder="Search for a movie..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">Search</button>
          </form>
          <Dropdown handleSortChange={handleSortChange} sortOption={sortOption} />
        </div>
      )}

      {activeView === "nowPlaying" && (
        <div className="filters">
          <Dropdown handleSortChange={handleSortChange} sortOption={sortOption} />
        </div>
      )}

      <div className="movieList-container">
        {sortedMovies.map((movie) => (
          <div
            className="movie-item"
            key={movie.id}
            onClick={() => handleMovieSelect(movie)}
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
      {!loading && sortedMovies.length > 0 && (
        <button onClick={handleLoadMore} className="load-more">
          Load More
        </button>
      )}
      {!loading && sortedMovies.length === 0 && (
        <p>No movies found</p>
      )}

      {selectedMovie && selectedMovieDetails && (
        <Modal
          show={selectedMovie !== null}
          onClose={() => {
            setSelectedMovie(null);
            setSelectedMovieDetails(null); // Reset selectedMovieDetails on modal close
          }}
        >
          <h2>{selectedMovieDetails.title}</h2>
          <img src={`https://image.tmdb.org/t/p/w500${selectedMovieDetails.backdrop_path}`} alt={`${selectedMovieDetails.title} backdrop`} />
          <p>Release Date: {selectedMovieDetails.release_date}</p>
          <p>Overview: {selectedMovieDetails.overview}</p>
          <p>Genres: {selectedMovieDetails.genres.map(genre => genre.name).join(', ')}</p>
          <p>Runtime: {selectedMovieDetails.runtime} minutes</p>
        </Modal>
      )}
    </>
  );
}

export default MovieList;
