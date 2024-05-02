import React, { useEffect, useState } from 'react';
import './App.css';

import Sidebar from './components/sidebar/Sidebar'
import Header from './components/header/Header';
import Discard from './components/modal/Discard';
import Delete from './components/modal/Delete';
import Edit from './components/modal/Edit';
import Category from './components/modal/Category';

import { FaClipboardList, FaSearch, FaPlus} from "react-icons/fa";
import { BsThreeDots } from "react-icons/bs";
import search from './assets/search.png'

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
        {/*uncomment to view modal ui
          <Edit/>
          <Category/>
          <Discard />
          <Delete />
        */}
      <div className='flex'>
        <div className='w-[14%]'>
          <Sidebar/>
        </div>
        <div className='w-[86%] h-full'>
          <Header/>
          <div className='bg-[#F3F3F3] h-[91.9vh]'>
              {/* First Section */}
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

              {/* Second Section */}
              <div>
                <table className='w-[93%] mx-[3%] mt-[1%] text-[#717171] text-[1.2em]'>
                  <thead className='text-left'>
                    {/* Column Labels */}
                    <tr>
                      <th>TASK TITLE</th>
                      <th>TASK DESCRIPTION</th>
                      <th>STATUS</th>
                      <th>
                       <BsThreeDots />
                      </th>
                    </tr>

                    {/* Add Task */}
                    <tr className='hover:cursor-pointer'>
                      <td colSpan={4}>
                        <div className='flex items-center my-[0.5%] py-[1%] pl-[2%] border-dashed border-2 border-yellow rounded-[12px]'>
                          <FaPlus className='text-secondary text-[1.2em]'/>
                          <h1 className='text-[#3C3C3C] text-[1.2em] font-semibold pl-[1.2%]'>Add Task</h1>
                        </div>
                      </td>
                    </tr>

                  </thead>
                  <tbody className='w-[100%]'>
                    {taskExist
                    ?
                    <> 
                    Upcoming
                     </>
                    :
                      <div className='w-full mt-[18%] ml-[85%]'>
                         <img src={search} alt="Figure Searching" className=""></img>
                         <h1 className='text-[#FB8500] font-bold text-[1.3em]'>No Tasks Listed Yet!</h1>
                      </div>
                    }
                  </tbody>
                </table>
              </div>

          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
