import React from 'react';

const MovieList = ({ movies, favoriteComponent, handleFavoriteClick }) => {
  const Favorites = favoriteComponent;

  return (
    <>
      {movies.map((movie, index) => (
        <div
          className='image-container d-flex justify-content-start m-3'
          key={index}>
          <img src={movie.Poster} alt={movie.Title} />
          <div
            className='overlay d-flex justify-content-center align-items-center'
            onClick={() => handleFavoriteClick(movie)}>
            <Favorites />
          </div>
        </div>
      ))}
    </>
  );
};

export default MovieList;
