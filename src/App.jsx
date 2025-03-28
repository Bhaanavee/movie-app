import { useEffect, useState } from "react";
import heroImage from "./assets/hero.png";
import Search from "./components/Search";

const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;

const API_OPTIONS = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
}

function App() {

  const [searchTerm, setSearchTerm] = useState('')
  const [errorMessage, setErrorMessage] = useState(null)
  const [movieList, setMovieList] = useState([]);
  const [isLoading, setIsLoading] = useState(false);


  
      //const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const fetchMovies = async (query = '') => {
        setIsLoading(true);
        setErrorMessage('');
    
        try {
          const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;
    
          const response = await fetch(endpoint, API_OPTIONS);
    
          if(!response.ok) {
            throw new Error('Failed to fetch movies');
          }
    
          const data = await response.json();
    
          if(data.Response === 'False') {
            setErrorMessage(data.Error || 'Failed to fetch movies');
            setMovieList([]);
            return;
          }
    
          setMovieList(data.results || []);
    
          if(query && data.results.length > 0) {
            await updateSearchCount(query, data.results[0]);
          }
        } catch (error) {
          console.error(`Error fetching movies: ${error}`);
          setErrorMessage('Error fetching movies. Please try again later.');
        } finally {
          setIsLoading(false);
        }
      }

  useEffect(() => {
    fetchMovies();
  },[]);
  return (
    <main>
      <div className="pattern" />
      <div className="wrapper">
        <header>
          <img src={heroImage} alt="Hero Banner" />
          <h1>
            Find <span className="text-gradient">Movies</span> You'll Enjoy Without the Hassle
          </h1>
          <Search searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>
        </header>
        <section className="all-movies">
          <h2>All Movies</h2>

          {isLoading ? (
            <Spinner />
          ) : errorMessage ? (
            <p className="text-red-500">{errorMessage}</p>
          ) : (
            <ul>
              {movieList.map((movie) => (
                <p key={movie.id} className="text-white">{movie.title}</p>
              ))}
            </ul>
          )}
        </section>
      </div>
    </main>
  );
}

export default App;
