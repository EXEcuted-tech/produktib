import React, { useEffect, useState } from 'react';
import './App.css';
import Sidebar from './components/sidebar/Sidebar'
import Header from './components/header/Header';
import Discard from './components/modal/Discard';
import Delete from './components/modal/Delete';
import Edit from './components/modal/Edit';
import Category from './components/modal/Category';

import { FaClipboardList, FaSearch } from "react-icons/fa";

//We will use this ra since usa ra ato page hehe

function App() {
  const [taskExist,setTaskExist] = useState(false);
  const [order,setOrder] = useState(false);
  
  useEffect(()=>{
    //Change to see layout of no task and vice-versa
    setTaskExist(false);
    console.log(order);
  },[])

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

              <div className='flex pt-[2%] pl-[3%]'>
                <div className='flex items-center w-[58%]'>
                  <FaClipboardList className='text-[1.5em]'/>
                  <h1 className='text-[1.8em] font-medium pl-[0.5%]'>Task Board</h1>
                </div>

                <div className='flex w-[42%] relative'>
                  <FaSearch className='text-[1.2em] absolute top-[26%] ml-[2%] text-[#707070]'/>
                  <input type="text" placeholder="Search Task Title or Description..." 
                  className='pl-[5%] w-[52%] border-2 rounded-[10px] mr-[1%]'/>
                  <div className='flex w-[28%] bg-white border-2 rounded-[10px] relative'>
                    <h1 className='absolute top-[23%] pl-[5%] font-semibold'>Show:</h1>
                    <div className='pl-[35%] py-[5%]'>
                      <select className='text-[#707070] outline-none'>
                        <option value="all">All</option>
                        <option value="notStarted">Not Started</option>
                        <option value="inProgress">In Progress</option>
                        <option value="completed">Completed</option>
                      </select>
                    </div>
                  </div>
                  <button className='ml-[1%] bg-white border-[2px] rounded-[10px] px-[1%]'
                    onClick={() => { setOrder(prevOrder => !prevOrder) }}>
                    {order 
                    ?
                    <h1 className='text-[#707070] font-bold'>A-Z</h1>
                    :
                    <h1 className='text-[#707070] font-bold'>Z-A</h1>
                    }
                  </button>
                </div>
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
