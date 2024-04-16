import React, { useEffect, useState } from 'react';
import axios from 'axios';

function SearchBar() {
  const [query, setQuery] = useState('');
  const [title, setTitle] = useState('');
//   const [searchResults, setSearchResults] = useState([]);
  const [error, setError] = useState(null);
  const [searchResults, setSearchResults] = useState([]);
  
// 

  const handleSearch = async () => {
  
console.log(title)
    try {


      const responseByTitle = await axios.get('https://books-api7.p.rapidapi.com/books/find/title', {
        params: {
          title: "Wuthering"
        },
        headers: {
          'X-RapidAPI-Key': '5d4ddf6097msh911242527e98044p1d4398jsne1bf694d4335',
          'X-RapidAPI-Host': 'books-api7.p.rapidapi.com'
        }
      });

      setSearchResults(
         responseByTitle.data
      );
      console.log(searchResults)
      setError(null);
    } catch (error) {
      console.error('Error searching books:', error);
      setSearchResults([]);
      setError('Error searching books. Please try again.');
    }
  };

useEffect(()=>{
    handleSearch()
    
},[title])

  return (
    <div>
      <form  className="form-inline my-2 my-lg-0">
        <input
          className="form-control mr-sm-2 container mt-3"
          type="search"
          placeholder="Search by Author or Title"
          aria-label="Search"
          value={title}
          onChange={(e)=>setTitle(e.target.value)}
        />
        <button className="btn btn-outline-success my-2 my-sm-0 mx-auto" type="submit">
          Search
        </button>
      </form>

      {error && <p>{error}</p>}



      {searchResults.length > 0 && (
        <div>
          <h2>Search Results by Title</h2>
          <ul>
            {searchResults.map((book, index) => (
              <li key={index}>{book.title}</li>
      
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default SearchBar;
