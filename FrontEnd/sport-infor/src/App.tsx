import React from 'react';
import logo from './logo.svg';
import './App.css';
import { HashRouter as Router, BrowserRouter, Route, Routes } from 'react-router-dom';
import Main from './pages/Main/Main';


function App() {
  return (
    <div className="App" id="test">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Main />} />
        </Routes>
      </BrowserRouter>
    </div>


  );
}

export default App;
