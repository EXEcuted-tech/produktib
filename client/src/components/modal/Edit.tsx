import Reac,{useEffect, useState} from 'react'
import { IoMdClose } from "react-icons/io";
import { TbTextSize } from "react-icons/tb";
import { GrTextAlignFull } from "react-icons/gr";


const Edit = () => {
const [color, setColor] = useState("#FFB703");
const [showColorPicker, setShowColorPicker] = useState(false);

const handleCircleClick = () => {
    setShowColorPicker(!showColorPicker);
  };

  return (
    <div className='font-lato z-[100]'>
        <div className='z-0 absolute top-0 left-0 bg-[rgba(0,0,0,0.1)] w-[100vw] h-[100vh] backdrop-blur-sm'>
            <div className='h-[50vh] w-[30vw] rounded-lg shadow-xl bg-white my-[20rem] mx-[55rem] justify-center'>
                <div className='h-[5vh] w-full bg-[#023047] rounded-t-lg flex items-center justify-between'>
                    <p className='text-white text-[1.3em] font-semibold pl-[4%]'>Edit Task</p>
                    <IoMdClose className='text-white text-[1.8em] mr-[3%] hover:cursor-pointer hover:animate-shake'/>
                </div>

                 {/* Task Name */}
                <div>
                    <div className='mx-[5%] pt-[5%] flex'>
                        <TbTextSize className='text-[1.5em]' />
                        <p className='text-[1.3em] font-semibold ml-[3%]'> Title</p>
                    </div>
                    <div className='ml-[8%] text-[1.2em] font-semibold mt-[1%]'>
                        <input 
                            type="text" 
                            value={'asdasdad'} 
                            className='w-[25vw] h-[4vh] rounded-xl bg-white border-[3px] border-[#FFB703] px-[4%]'>
                        </input>
                    </div>
                </div>

                 {/* Description */}
                <div>
                    <div className='mx-[5%] pt-[5%] flex'>
                        <GrTextAlignFull className='text-[1.5em]' />
                        <p className='text-[1.3em] font-semibold ml-[3%]'> Task Description</p>
                    </div>
                    <div className='ml-[8%] text-[1.2em] mt-[1%]'>
                        <textarea 
                            value={'IT 3206 | Make a wireframe that changes my life The quick brown jumps over the lazy dog e a wireframe that changes my life'} 
                            className='w-[25vw] h-[20vh] rounded-xl bg-white border-[3px] border-[#FFB703] px-[4%] py-[2%] text-justify resize-none'>
                        </textarea>
                    </div>
                </div>



                 {/* Buttons */}
                 <div className='flex flex-row justify-end pt-[4%]'>
                    <div className='mr-[22%]'>
                        <select className='flex appearance-auto w-[7.5vw] text-[1.1em] font-semibold bg-white border border-gray-400 hover:border-gray-500 px-4 py-2 pr-8 rounded shadow leading-tight focus:outline-none focus:shadow-outline'>
                            <option selected>Status</option>
                            <option>Not Started</option>
                            <option>In Progress</option>
                            <option>Completed</option>
                        </select>
                    </div>
                    <button className='w-[5vw] h-[3.5vh] text-[1.1em] text-black rounded-lg bg-[#D6D6D6] font-semibold mr-[3%] hover:bg-[#bebebe] transition-colors delay-250 duration-[3000] ease-in'>
                        Cancel</button>
                    <button className='w-[5vw] h-[3.5vh] text-[1.1em] text-white rounded-lg bg-[#FB8500] font-semibold mr-[9%] hover:bg-[#FF9925] transition-colors delay-250 duration-[3000] ease-in'>
                        Save</button>
                 </div>
            </div>

           
        </div>
    </div>
  )
}

export default Edit