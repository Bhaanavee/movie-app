import { useEffect, useState } from "react";
import heroImage from "./assets/hero.png";
import Search from "./components/Search";

const API_BASE_URL = 'https://api.themoviedb.org/3'
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

  const fetchMovies = async () => {
    try{
      const endpoint = `${API_BASE_URL}/discover/movie?sort_by=popularity.desc`;

      const response = await fetch(endpoint, API_OPTIONS);

      if(!response.ok) {
        throw new Error('Failed to fetch movies');
      }

      const data = await response.json();
      
      if(data.Response === 'False') {
        setErrorMessage(data.Error || 'Failed to fetch movies');
      }

    }catch(error){
      console.error(`Error Fetching Movies : ${error}`)
      setErrorMessage('Error fetching movies, please try again later'); 
    };
    

  }

  useEffect(() => {

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

            <p className="text-red-500">{errorMessage}</p>
          
        </section>
      </div>
    </main>
  );
}

export default App;
