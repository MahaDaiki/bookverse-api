import React, { useState } from 'react';
import axios from 'axios';

function SearchBar() {
  const [query, setQuery] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState({
    byAuthor: [],
    byTitle: []
  });
  
  const handleChange = (event) => {
    setQuery(event.target.value);
  };

  const handleSearch = async (event) => {
    event.preventDefault();

    try {
      const responseByAuthor = await axios.get('https://books-api7.p.rapidapi.com/books/find/author', {
        params: {
          lname: query.split(' ')[1], // Extracting last name
          fname: query.split(' ')[0] // Extracting first name
        },
        headers: {
          'X-RapidAPI-Key': '5d4ddf6097msh911242527e98044p1d4398jsne1bf694d4335',
          'X-RapidAPI-Host': 'books-api7.p.rapidapi.com'
        }
      });

      const responseByTitle = await axios.get('https://books-api7.p.rapidapi.com/books/find/title', {
        params: {
          title: query
        },
        headers: {
          'X-RapidAPI-Key': '5d4ddf6097msh911242527e98044p1d4398jsne1bf694d4335',
          'X-RapidAPI-Host': 'books-api7.p.rapidapi.com'
        }
      });

      setSearchResults({
        byAuthor: responseByAuthor.data,
        byTitle: responseByTitle.data
      });
      setError(null);
    } catch (error) {
      console.error('Error searching books:', error);
      setSearchResults([]);
      setError('Error searching books. Please try again.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSearch} className="form-inline my-2 my-lg-0">
        <input
          className="form-control mr-sm-2 container mt-3"
          type="search"
          placeholder="Search by Author or Title"
          aria-label="Search"
          value={query}
          onChange={handleChange}
        />
        <button className="btn btn-outline-success my-2 my-sm-0 mx-auto" type="submit">
          Search
        </button>
      </form>

      {error && <p>{error}</p>}

      {searchResults.byAuthor.length > 0 && (
        <div>
          <h2>Search Results by Author</h2>
          <ul>
            {searchResults.byAuthor.map((book, index) => (
              <li key={index}>{book.title} by {book.author}</li>

            ))}
          </ul>
        </div>
      )}

      {searchResults.byTitle.length > 0 && (
        <div>
          <h2>Search Results by Title</h2>
          <ul>
            {searchResults.byTitle.map((book, index) => (
              <li key={index}>{book.title}</li>
      
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
