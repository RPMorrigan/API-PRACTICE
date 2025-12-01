import { useState, useEffect } from 'react';
import './App.css';

//Make four different API calls and display the data back to the user
//Use a useEffect so the data is fetched when the user arrives at the site

//Google Books:
//https://www.googleapis.com/books/v1/volumes?q=harry+potter&maxResults=5
//Map over the data and show title and author for all 5 results

//News API:
// this API can only be used in development mode - not on Third party sites
//https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=5565780fc92146d28985193e26a86af2
//Map over and show title and author for each item

//Advice Slip API
//https://api.adviceslip.com/advice
//Call the API and show the ID and advice back to the user

//Weather API
//https://api.open-meteo.com/v1/forecast?latitude=37.77&longitude=-122.42&current_weather=true
//Call the API and show the current temerature and current windspeed back to the user

function App() {
  const [gBooks, setGBooks] = useState([]);
  const [theNews, setNews] = useState([]);
  const [myAdvice, setAdvice] = useState(null);
  const [myWeather, setWeather] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

      // Google Books
      const gBooksReply = await fetch('https://www.googleapis.com/books/v1/volumes?q=harry+potter&maxResults=5');
      const gBooksData = await gBooksReply.json();
      setGBooks(gBooksData.items || []);

      // News
      const newsReply = await fetch('https://newsapi.org/v2/top-headlines?country=us&category=technology&apiKey=5565780fc92146d28985193e26a86af2');
      const newsData = await newsReply.json();
      setNews(newsData.articles || []);

      // Advice
      const adviceReply = await fetch('https://api.adviceslip.com/advice');
      const adviceData = await adviceReply.json();
      setAdvice(adviceData.slip);

      // Weather
      const weatherReply = await fetch('https://api.open-meteo.com/v1/forecast?latitude=37.77&longitude=-122.42&current_weather=true');
      const weatherData = await weatherReply.json();
      setWeather(weatherData.current_weather);

    } catch (err) {
      setError('Error fetching data' + err.message);
      console.log('Error fetching data', err);
    } finally {
      setLoading(false);
    }
  };
  
  fetchData();
}, []);
    return (
      <div className="App">
        <div className="google-books wrapper">
          <h2>Harry Potter</h2>
          {gBooks.map((book) => (
            <div className="card" key={book.id}>
              <img src={book.volumeInfo.imageLinks?.thumbnail} alt={book.volumeInfo.title} />
              <h3>{book.volumeInfo.title}</h3>
              <p>By: {book.volumeInfo.authors}</p>
            </div>
          ))}
        </div>
        <div className="news wrapper">
          <h2>News</h2>
          {theNews.map((news) => (
            <div className="card" key={ news.index}>
              <img src={news.urlToImage}/>
              <h3>{ news.name }</h3>
              <p>By: {news.author}</p>
          </div>
          ))}
        </div>
        <div className="advice wrapper">
          <h2>Advice</h2>
          {myAdvice ? (
            <div className="card">
              <h3>Advice #{myAdvice.id}</h3>
              <p>{myAdvice.advice}</p>
            </div>
          ) : (
            <p>Loading advice...</p>
          )}
        </div>
        <div className="weather wrapper">
            <h2>Weather</h2>
          <div className="card">
            {myWeather ? (
              <div>
                <h3>Today's Weather</h3>
                <p>Temperature: {myWeather.temperature}°C</p>
                <p>Windspeed: {myWeather.windspeed} km/h</p>
              </div>
            ) : (
                <p>Loading weather...</p>
            )}
            </div>
        </div>
      </div>
    );
  }

export default App;
