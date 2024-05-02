import React from 'react';
import './App.css';
import Sidebar from './components/sidebar/Sidebar'
import Header from './components/header/Header';
import Discard from './components/modal/Discard';
import Delete from './components/modal/Delete';
import Edit from './components/modal/Edit';
import Category from './components/modal/Category';

import { FaClipboardList } from "react-icons/fa";

//We will use this ra since usa ra ato page hehe

function App() {
  return (
    <div className="animate-fade-in font-montserrat">
      <div className='flex'>
        <div className='w-[14%]'>
          <Sidebar/>
        {/*uncomment to view modal ui
          <Edit/>
          <Category/>
          <Discard />
          <Delete />
        */}
        </div>
        <div className='w-[86%] h-full'>
          <Header/>
          <div className='bg-[#F3F3F3] h-[91.9vh]'>

              <div className='flex pt-[2%] pl-[3%] items-center'>
                <FaClipboardList className='text-[1.5em]'/>
                <h1 className='text-[1.8em] font-medium pl-[0.5%]'>Task Board</h1>
                
              </div>

              <div>
                
              </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
