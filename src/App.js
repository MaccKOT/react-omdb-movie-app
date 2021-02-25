import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useEffect, useState } from 'react';
import MovieList from './components/MovieList';
import Header from './components/Header';
import SearchBar from './components/SearchBar';
import AddFavorites from './components/AddFavorites';
import RemoveFavorites from './components/RemoveFavorites';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [favorites, setFavorites] = useState([]);

  useEffect(() => {
    getMoviesRequest(searchValue);
  }, [searchValue]);

  useEffect(() => {
    // get favorites from localstorage
    const movieFavorites = JSON.parse(
      localStorage.getItem('react-movie-app-favorites')
    );
    if (movieFavorites !== '') setFavorites(movieFavorites);
  }, []);

  const saveToLocalStorage = (items) => {
    localStorage.setItem('react-movie-app-favorites', JSON.stringify(items));
  };

  const getMoviesRequest = async (searchValue) => {
    // http://www.omdbapi.com/?s=star%20wars&apikey=xxxxxx
    const url = `http://www.omdbapi.com/?s=${searchValue}&apikey=${process.env.REACT_APP_OMDB_API_KEY}`;

    const response = await fetch(url);
    const responseJson = await response.json();
    // console.log(responseJson);
    if (responseJson.Search) {
      setMovies(responseJson.Search);
    }
  };

  const addFavoriteMovie = (movie) => {
    // TODO check for movie already in favorites!
    const newFavoriteList = [...favorites, movie];
    setFavorites(newFavoriteList);
    saveToLocalStorage(newFavoriteList);
  };

  const RemoveFavoriteMovie = (movie) => {
    const filteredFavorites = favorites.filter(
      (elem) => elem.imdbID !== movie.imdbID
    );
    setFavorites(filteredFavorites);
    saveToLocalStorage(filteredFavorites);
  };

  return (
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <Header heading={'Movies'} />
        <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className='row'>
        <MovieList
          movies={movies}
          favoriteComponent={AddFavorites}
          handleFavoriteClick={addFavoriteMovie}
        />
      </div>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <Header heading={'Favorites'} />
      </div>
      <div className='row'>
        <MovieList
          movies={favorites}
          favoriteComponent={RemoveFavorites}
          handleFavoriteClick={RemoveFavoriteMovie}
        />
      </div>
    </div>
  );
}

export default App;
