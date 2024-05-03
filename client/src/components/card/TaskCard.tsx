import React, { useEffect } from 'react'
import { TaskCardProps } from '../../common/interface'
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";

const TaskCard: React.FC<TaskCardProps> = (task) => {
  
   const shortDesc = task.description.length > 80 
  ? task.description.substring(0, 80) + '...' 
  : task.description;

  useEffect(()=>{

  },[])

  return (
    <div className='relative w-[93%] bg-white mx-[3%] mt-[1%] rounded-lg drop-shadow-md dark:bg-black z-0'>
        <table className='w-[100%] text-[#717171] text-[1.2em]'>
            <tbody>
                <tr className='text-left'>
                    <td className='pl-[1%] py-[1.5%] w-[25%] text-[1em] text-[#3C3C3C] font-semibold dark:text-white'>{task.title}</td>
                    <td className='font-regular text-[0.8em] w-[48%] text-[#3C3C3C] dark:text-white'>{shortDesc}</td>
                    <td className='w-[22%]'>
                        <div className={`ml-[4%] text-white text-center font-extrabold text-[0.8em] px-[2%] py-[2%] w-[40%] rounded-[5px]
                            ${task.task_status==='Not Started' 
                                    ? 'bg-secondary dark:bg-white dark:text-secondary' : task.task_status==='In Progress' 
                                    ? 'bg-blue dark:bg-white dark:text-blue' : 'bg-[#00A71B] dark:bg-white dark:text-[#00A71B]'}`}>
                        {task.task_status}
                        </div>
                    </td>
                    <td>
                        <PiDotsThreeOutlineVerticalFill/>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
  )
}

export default TaskCard