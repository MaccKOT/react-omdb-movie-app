import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useEffect, useState } from 'react';
import MovieList from './components/MovieList';
import Header from './components/Header';
import SearchBar from './components/SearchBar';

function App() {
  const [movies, setMovies] = useState([]);
  const [searchValue, setSearchValue] = useState('');

  useEffect(() => {
    getMoviesRequest(searchValue);
  }, [searchValue]);

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

  return (
    <div className='container-fluid movie-app'>
      <div className='row d-flex align-items-center mt-4 mb-4'>
        <Header heading={'Movies'} />
        <SearchBar searchValue={searchValue} setSearchValue={setSearchValue} />
      </div>
      <div className='row'>
        <MovieList movies={movies} />
      </div>
    </div>
  );
}

export default App;
