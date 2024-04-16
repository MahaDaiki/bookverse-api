// import React from 'react';
import './App.css';
import NavBar from './navbar';
import BookComponent from './BookComponent';
import WelcomePage from './welcome';
import SearchBar from './Searchbar';
import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="App"> 
    <NavBar />
    <WelcomePage />
    <SearchBar />
    <BookComponent />
       
    </div>
  );
}

export default App;
