import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import { useEffect, useState } from 'react';
import MovieList from './components/MovieList';

function App() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    getMoviesRequest();
  }, []);

  const getMoviesRequest = async () => {
    // http://www.omdbapi.com/?s=star%20wars&apikey=xxxxxx
    const url = `http://www.omdbapi.com/?s=star%20wars&apikey=${process.env.REACT_APP_OMDB_API_KEY}`;

    const response = await fetch(url);
    const responseJson = await response.json();
    // console.log(responseJson);
    setMovies(responseJson.Search);
  };

  return (
    <div className='container-fluid movie-app'>
      <div className='row'>
        <MovieList movies={movies} />
      </div>
    </div>
  );
}

export default App;
