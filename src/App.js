import logo from './logo.svg';
import './App.css';
import { useState } from 'react';

// function App() {
//   return (
//     <div className="App">
//       <header className="App-header">
//         <img src={logo} className="App-logo" alt="logo" />
//         <p>
//           Edit <code>src/App.js</code> and save to reload.
//         </p>
//         <a
//           className="App-link"
//           href="https://reactjs.org"
//           target="_blank"
//           rel="noopener noreferrer"
//         >
//           Learn React
//         </a>
//       </header>
//     </div>
//   );
// }

// const API_KEY = "your_api_key";

const App = () => {
  const [searchTerm, setSearchTerm] = useState("Batman");
  const [movies, setMovies] = useState([]);

  const searchMovies = async (title) => {
    const response = await fetch(
      `http://www.omdbapi.com/?i=tt3896198&apikey=1284fa58`
    );
    const data = await response.json();
    if (data.Search) {
      setMovies(data.Search);
    } else {
      setMovies([]);
    }
  };

  useEffect(() => {
    searchMovies(searchTerm);
  }, []);

  return (
    <div className="app">
      <h1>🎥 Movie Search</h1>

      <div className="search">
        <input
          type="text"
          placeholder="Search for movies..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        <button onClick={() => searchMovies(searchTerm)}>Search</button>
      </div>

      <div className="movie-container">
        {movies.length > 0 ? (
          movies.map((movie) => (
            <MovieCard key={movie.imdbID} movie={movie} />
          ))
        ) : (
          <h2>No movies found</h2>
        )}
      </div>
    </div>
  );
};

export default App;
