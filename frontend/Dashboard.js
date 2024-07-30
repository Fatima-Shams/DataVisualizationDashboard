import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Bar, Line } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend, LineElement, PointElement);

const Dashboard = () => {
  const [movies, setMovies] = useState([]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());

  useEffect(() => {
    axios.get('http://localhost:8000/movies/')
      .then(response => {
        setMovies(response.data);
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const years = [...new Set(movies.map(movie => movie.year))];

  const handleYearChange = (event) => {
    setSelectedYear(event.target.value);
  };

  const filteredMovies = movies.filter(movie => movie.year === parseInt(selectedYear));
  const topGrossMovies = filteredMovies.sort((a, b) => b.gross - a.gross).slice(0, 5);
  const topRatingMovies = filteredMovies.sort((a, b) => b.rating - a.rating).slice(0, 10);

  const grossData = {
    labels: topGrossMovies.map(movie => movie.title),
    datasets: [
      {
        label: 'Gross ($)',
        data: topGrossMovies.map(movie => movie.gross),
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        borderColor: 'rgba(75, 192, 192, 1)',
        borderWidth: 1,
      }
    ],
  };

  const votesData = {
    labels: movies.sort((a, b) => b.votes - a.votes).slice(0, 5).map(movie => movie.title),
    datasets: [
      {
        label: 'Votes',
        data: movies.sort((a, b) => b.votes - a.votes).slice(0, 5).map(movie => movie.votes),
        borderColor: 'rgba(75, 192, 192, 1)',
        backgroundColor: 'rgba(75, 192, 192, 0.2)',
        fill: true,
      }
    ],
  };

  const ratingData = {
    labels: topRatingMovies.map(movie => movie.title),
    datasets: [
      {
        label: 'Rating',
        data: topRatingMovies.map(movie => movie.rating),
        backgroundColor: 'rgba(153, 102, 255, 0.2)',
        borderColor: 'rgba(153, 102, 255, 1)',
        borderWidth: 1,
      }
    ],
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Movie Dashboard</h1>
      <label htmlFor="year">Select Year:</label>
      <select id="year" value={selectedYear} onChange={handleYearChange}>
        {years.map(year => (
          <option key={year} value={year}>{year}</option>
        ))}
      </select>
      <div style={{ display: 'flex', justifyContent: 'space-around', marginTop: '20px' }}>
        <div>
          <h2>Top 5 Movies by Gross</h2>
          <Bar data={grossData} />
        </div>
        <div>
          <h2>Top 5 Movies/Series of All Time by Votes</h2>
          <Line data={votesData} />
        </div>
        <div>
          <h2>Top 10 Movies by Rating</h2>
          <Bar data={ratingData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
