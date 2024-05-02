import React from 'react';
import './App.css';
import Sidebar from './components/sidebar/Sidebar'
import Discard from './components/modal/Discard';
import Delete from './components/modal/Delete';
//We will use this ra since usa ra ato page hehe

function App() {
  return (
    <div className="animate-fade-in font-montserrat flex">
      <div className='w-[14%]'>
        <Sidebar/>
        {/*
        uncomment to view modal ui
        <Discard />
        <Delete />
        */}
      </div>
    </div>
  );
}

export default App;
