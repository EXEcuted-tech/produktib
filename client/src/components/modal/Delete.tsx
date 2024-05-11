import React, { useState, CSSProperties } from "react";
import { FiX } from "react-icons/fi";
import BounceLoader from "react-spinners/ClipLoader";
import { GoAlertFill } from "react-icons/go";
import axios from "axios";
import config from "../../common/config";
import UserNotification from "../alerts/Notification";
import { AiFillExclamationCircle } from "react-icons/ai";
/* Modify this Component to add functionalities */

const Delete = ({onClose,setLoadingPage}) => {
  const [taskId, setTaskId] =useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [errMess,setErrMess] = useState("");
  
  const handleClick = ()=>{
    const id = localStorage.getItem('task_id');
    setTaskId(id);
    setLoading(true);
    setLoadingPage(true);
    axios.post(`${config.API}/task/delete`,{
      task_id:id
    }).then((res)=>{
      if(res.status !== 200){
        console.log('error', res)
      }

      setTimeout(()=>{
        setLoadingPage(false)
      },1000)

      onClose();
    }).catch((error)=>{
      error.response? setErrMess(error.response?.data.message): setErrMess("Request Failed!");
      errorTimer();
    })
    
  }

  const errorTimer =  ()=>{ setTimeout(() => {
    setErrMess("");
  }, 5000);
  
}

  return (
    <div className="absolute z-[150] inset-0 backdrop-brightness-50 flex items-center justify-center">
      {errMess !='' && 
          <UserNotification
            icon={<AiFillExclamationCircle/>}
            logocolor='#ff0000'
            title="Error!"
            message={errMess}
          />
      }
      <div className="absolute z-[150] ml-[15%] bg-white rounded-lg shadow-md overflow-hidden w-full max-w-sm font-montserrat">
        {/* X close button */}
        <section className="flex justify-end p-2">
          <button onClick={onClose}>
            <FiX className="text-black text-2xl hover:text-alert"/>
          </button>
        </section>

        {/* Vector and Title and Desc */}
        <section className="p-4">
        <div className="flex justify-center">
            <GoAlertFill className="text-alert mb-2 text-center w-16 h-16"/>
        </div>
          <h3 className="font-bold text-2xl text-black mb-2 text-center">
            Are You Sure?
          </h3>
          <p className="font-light text-center">
            Do you want to delete this task? This process cannot be undone.
          </p>
        </section>

        {/* Buttons */}
        <section className="flex justify-evenly pb-4">
          <button className="button bg-gray-400 text-white p-[0.5em] w-[30%] rounded-md hover:bg-gray-500 font-bold transition-colors delay-250 duration-[3000] ease-in"
          onClick={onClose}>
            Cancel
          </button>
          <button onClick={handleClick} className="button bg-alert text-white p-[0.5em] w-[30%] rounded-md hover:bg-red-400 font-bold transition-colors delay-250 duration-[3000] ease-in">
       <div className="flex justify-evenly items-center duration-100">     
    <BounceLoader color="#FFFFFF" 
          loading={loading} />
            Delete
            </div>
          </button>
        </section>

      </div>
    </div>
  );
};

export default Delete;
