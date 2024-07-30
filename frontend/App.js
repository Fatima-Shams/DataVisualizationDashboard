import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Bar, Line } from 'react-chartjs-2';

function App() {
  const [topGrossMovies, setTopGrossMovies] = useState([]);
  const [topVotedMovies, setTopVotedMovies] = useState([]);
  const [topRatedMovies, setTopRatedMovies] = useState([]);
  const [year, setYear] = useState(new Date().getFullYear());
  const [years, setYears] = useState([]);

  useEffect(() => {
    // Fetch available years
    axios.get('/movies/available-years/')
      .then((response) => {
        setYears(response.data);
      })
      .catch((error) => {
        console.error('Error fetching years:', error);
      });

    // Fetch movies data for the selected year
    axios.get(`/movies/top-gross-movies/${year}/`)
      .then((response) => {
        setTopGrossMovies(response.data);
      })
      .catch((error) => {
        console.error('Error fetching top gross movies:', error);
      });

    axios.get(`/movies/top-rated-movies/${year}/`)
      .then((response) => {
        setTopRatedMovies(response.data);
      })
      .catch((error) => {
        console.error('Error fetching top rated movies:', error);
      });

    axios.get('/movies/top-voted-movies/')
      .then((response) => {
        setTopVotedMovies(response.data);
      })
      .catch((error) => {
        console.error('Error fetching top voted movies:', error);
      });
  }, [year]);

  const topGrossMoviesData = {
    labels: topGrossMovies.map((movie) => movie.name),
    datasets: [
      {
        label: 'Gross',
        data: topGrossMovies.map((movie) => movie.gross),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      },
    ],
  };

  const topVotedMoviesData = {
    labels: topVotedMovies.map((movie) => movie.name),
    datasets: [
      {
        label: 'Votes',
        data: topVotedMovies.map((movie) => movie.votes),
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      },
    ],
  };

  const topRatedMoviesData = {
    labels: topRatedMovies.map((movie) => movie.name),
    datasets: [
      {
        label: 'Rating',
        data: topRatedMovies.map((movie) => movie.rating),
        backgroundColor: 'rgba(255, 159, 64, 0.2)',
        borderColor: 'rgba(255, 159, 64, 1)',
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h1>Movie Dashboard</h1>
      <div>
        <label>
          Year:
          <select value={year} onChange={(e) => setYear(e.target.value)}>
            {years.map((y) => (
              <option key={y} value={y}>{y}</option>
            ))}
          </select>
        </label>
      </div>
      <div>
        <h2>Top Gross Movies of {year}</h2>
        <Bar data={topGrossMoviesData} />
      </div>
      <div>
        <h2>Top Voted Movies of All Time</h2>
        <Line data={topVotedMoviesData} />
      </div>
      <div>
        <h2>Top Rated Movies of {year}</h2>
        <Bar data={topRatedMoviesData} />
      </div>
    </div>
  );
}

export default App;
