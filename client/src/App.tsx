import React from 'react';
import './App.css';
import Sidebar from './components/sidebar/Sidebar'

//We will use this ra since usa ra ato page hehe

function App() {
  return (
    <div className="animate-fade-in font-montserrat flex">
      <div className='w-[14%]'>
        <Sidebar/>
      </div>
    </div>
  );
}

export default App;
