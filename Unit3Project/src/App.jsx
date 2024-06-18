// import React from "react";
// // import { useState } from "react";
// import Header from "./Components/Header/Header";
// import MovieCard from "./Components/MovieCard/MovieCard";
// import MovieList from "./Components/MovieList/MovieList";
// import "./App.css";
// const App = () => {
//   return (
// <>
//     <Header/> 

//       <div className="App"> App Container
//     <MovieList/>
    
//       </div>
//     </>
//   );
// };
// export default App;

import React from "react";
import Header from "./Components/Header/Header";
import MovieList from "./Components/MovieList/MovieList";
import "./App.css";
import Footer from "./Components/Footer/Footer";
import Modal from "./Components/Modal/Modal";

const App = () => {
  return (
    <>
      <Header />
      <div className="App">
        <MovieList />
        <Modal/>
      </div>
      <Footer/>
    </>
  );
};

export default App;


