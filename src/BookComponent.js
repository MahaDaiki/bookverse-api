import React, { useEffect, useState } from 'react';
import axios from 'axios';

function BookListComponent() {
  const [books, setBooks] = useState([]);
  const apiKey = '5d4ddf6097msh911242527e98044p1d4398jsne1bf694d4335';

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://books-api7.p.rapidapi.com/books', {
          params: { p: '2' },
          headers: {
            'X-RapidAPI-Key': apiKey,
            'X-RapidAPI-Host': 'books-api7.p.rapidapi.com'
          }
        });
        setBooks(response.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, [apiKey]);

  return (
    <div className="container mt-5">
    <h1 className="mb-4">Books</h1>
    <div className="row">
      {books.map(book => (
        <div key={book._id} className="col-md-4 mb-4">
          <div className="card">
            <img src={book.cover} className="card-img-top" alt={book.title} />
            <div className="card-body">
              <h5 className="card-title">{book.title}</h5>
              <p className="card-text">{book.plot}</p>
            </div>
            <ul className="list-group list-group-flush">
              <li className="list-group-item">Genres: {book.genres.join(', ')}</li>
              <li className="list-group-item">Pages: {book.pages}</li>
              <li className="list-group-item">Rating: {book.rating}</li>
              <li className="list-group-item">Author: {book.author.first_name} {book.author.last_name}</li>
             
            </ul>
            <div className="card-body">
              <a href={book.url} className="card-link" target="_blank" rel="noopener noreferrer">More Info</a>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
);
}



export default BookListComponent;
