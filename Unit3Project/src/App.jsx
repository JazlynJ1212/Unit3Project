
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


