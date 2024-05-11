import React from 'react'

const ThreeDots = () => {
  return (
    <div className='bg-primary dark:bg-[#292929]'>
        <div className='flex space-x-2 justify-center items-center h-[92vh] dark:invert'>
            <span className='sr-only'>Loading...</span>
            <div className='h-8 w-8 bg-white dark:bg-white rounded-full animate-bounce [animation-delay:-0.3s]'></div>
            <div className='h-8 w-8 bg-white dark:bg-white rounded-full animate-bounce [animation-delay:-0.15s]'></div>
            <div className='h-8 w-8 bg-white dark:bg-white rounded-full animate-bounce'></div>
        </div>
    </div>
  )
}

export default ThreeDots