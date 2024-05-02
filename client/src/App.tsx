import React from 'react';
import './App.css';
import Sidebar from './components/sidebar/Sidebar'
import Header from './components/header/Header';

//We will use this ra since usa ra ato page hehe

function App() {
  return (
    <div className="animate-fade-in font-montserrat">
      <div className='flex'>
        <div className='w-[14%]'>
          <Sidebar/>
        </div>
        <div>
          <Header/>
          <div className='bg-[#F3F3F3] w-[100%] h-[93vh]'>
            TEST
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
