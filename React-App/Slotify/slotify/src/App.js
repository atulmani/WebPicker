import React from 'react';
import './App.css';
import BookingList from './components/BookingList';
import UserList from './components/UserList';

function App() {
  return (
    <div className="App">
      <h1>Slotify</h1>
      {/* <BookingList></BookingList> */}
      <UserList></UserList>
    </div>
  );
}

export default App;
