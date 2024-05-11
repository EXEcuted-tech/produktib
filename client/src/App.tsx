import React, { useEffect, useState } from "react";
import "./App.css";
import { FaMoon, FaRegMoon } from "react-icons/fa";
import Add from "./components/modal/Add";
import axios from "axios";

import Sidebar from "./components/sidebar/Sidebar";
import Header from "./components/header/Header";
import Discard from "./components/modal/Discard";
import Delete from "./components/modal/Delete";
import Edit from "./components/modal/Edit";
import Category from "./components/modal/Category";
import View from "./components/side pane/View Details";

import { FaClipboardList, FaSearch, FaPlus } from "react-icons/fa";
import { LuArrowDownUp, LuArrowUpDown } from "react-icons/lu";
import { BsThreeDots } from "react-icons/bs";
import Icon from "@mdi/react";
import { mdiSortCalendarAscending, mdiSortCalendarDescending } from "@mdi/js";

import search from "./assets/search.png";
import config from "./common/config";
import { TaskCardProps } from "./common/interface";
import TaskCard from "./components/card/TaskCard";
import GenSpinner from "./components/loaders/genSpinner";
import UserNotification from "./components/alerts/Notification";
import { AiFillExclamationCircle } from "react-icons/ai";

//We will use this ra since usa ra ato page hehe

function App() {
  const [taskExist, setTaskExist] = useState(false);
  const [order, setOrder] = useState("ASC");
  const [filter, setFilter] = useState("all");
  const [tasks, setTasks] = useState<TaskCardProps[]>([]);
  const [chosenID, setChosenID] = useState(localStorage.getItem("category_id")!="0" ? localStorage.getItem("category_id") : "1");
  const [currTaskId, setCurrTaskId] = useState("1");
  const [loadingPage, setLoadingPage] = useState(false);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [openAddModal, setOpenAddModal] = useState(false);
  const [activeTaskId, setActiveTaskId] = useState<number | null>(null);
  const [showView, setShowView] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [errMess,setErrMess] = useState("");

  useEffect(() => {
    console.log("Category ID! ", chosenID);
    if (filter == "all") {
      getAllTasks();
    } else if (filter == "pending") {
      getPendingTasks();
    } else if (filter == "inprogress") {
      getProgressTasks();
    } else {
      getFinishedTasks();
    }
  }, [chosenID, filter, order,loadingPage]);


  useEffect(()=>{
    console.log("Loading: ",loadingPage)
  },[])

  const handleOptionsClick = (taskId: number) => {
    //console.log("Task ID: ", taskId);
    setActiveTaskId(taskId);
    localStorage.setItem("task_id", JSON.stringify(activeTaskId));
  };

  const getAllTasks = () => {
    axios
      .get(
        `${config.API}/task/retrieve_all?col=category_id&val=${chosenID}&order=${order}`
      )
      .then((res) => {
        if (res.data.success == true && res.data.tasks.length > 0) {
          setTaskExist(true);
          setTasks(res.data.tasks);
        } else {
          setTaskExist(false);
          setTasks([]);
        }
      })
      .catch((error) => {});
  };

  const getPendingTasks = () => {
    axios
      .get(
        `${config.API}/task/retrieve?col1=category_id&val1=${chosenID}&col2=task_status&val2=Not Started&order=${order}`
      )
      .then((res) => {
        if (res.data.success == true && res.data.tasks.length > 0) {
          setTaskExist(true);
          setTasks(res.data.tasks);
        } else {
          setTaskExist(false);
          setTasks([]);
        }
      })
      .catch((error) => {});
  };

  const getProgressTasks = () => {
    axios
    .get(
      `${config.API}/task/retrieve?col1=category_id&val1=${chosenID}&col2=task_status&val2=In Progress&order=${order}`
    )
    .then((res) => {
      if (res.data.success == true && res.data.tasks.length > 0) {
        setTaskExist(true);
        setTasks(res.data.tasks);
      } else {
        setTaskExist(false);
        setTasks([]);
      }
    })
    .catch((error) => {});
    
    
  };

  const getFinishedTasks = () => {
    axios
      .get(
        `${config.API}/task/retrieve?col1=category_id&val1=${chosenID}&col2=task_status&val2=Completed&order=${order}`
      )
      .then((res) => {
        if (res.data.success == true && res.data.tasks.length > 0) {
          setTaskExist(true);
          setTasks(res.data.tasks);
        } else {
          setTaskExist(false);
          setTasks([]);
        }
      })
      .catch((error) => {});
  };

  const handleButtonClick = () => {
    setActiveTaskId(0);
    setOpenAddModal(false);
    setShowView(false);
    setShowEdit(false);
    setShowDelete(false);
    //console.log(localStorage.getItem("category_id"));
  };

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    //console.log(e.target.value);
    setFilter(e.target.value);
  };

  const handleChangeSearch = (e) => {
    console.log(e.target.value)
    setSearchQuery(e.target.value)
    if(e.target.value){
    axios.get(
      `${config.API}/task/retrievelike`,{
        params:{  
          col1: 'category_id',
          val1: `${chosenID}`,
          col2: ['title', 'description'],
          val2: searchQuery,
          order: `${order}`
      }
    }
    ).then(response =>{
      if(response.status == 200){
        if(response.data.tasks.length == 0){
          setTasks(response.data.tasks)
          setErrMess("No Results Found");
        }
        //console.log(response.data.tasks)
        setTasks(response.data.tasks)
      }
    }).catch(error=>{
      //console.log(error.response.data.message)
      setErrMess(error?.response?.data.message);
    }).finally(()=>{
      errorTimer();
    })
  }else{
    getAllTasks()
  }
  };

  function errorTimer (){ setTimeout(() => {
    setErrMess("");
  }, 5000);
}

  return (
    
    <div className="animate-fade-in font-montserrat">
      
      {openAddModal && (
        <Add onCancel={handleButtonClick} onSubmit={handleButtonClick} setLoadingPage={setLoadingPage}></Add>
      )}
      
      {showView && <View onClose={handleButtonClick} />}
      {showEdit && <Edit onClose={handleButtonClick} onSubmit={handleButtonClick}/>}
      {showDelete && <Delete onClose={handleButtonClick} setLoadingPage={setLoadingPage}/>}
      <div className="flex z-0">
        <div className="w-[14%] dark:bg-black">
          <Sidebar setChosenID={setChosenID} />
        </div>

        <div className="w-[86%] dark:bg-black flex flex-col">
          <Header />
          {loadingPage ?
          <GenSpinner/>
        :
          <div className="bg-[#F3F3F3] h-[91.1vh] pb-[3%] overflow-auto flex-grow">
            {/* First Section */}
      {errMess !='' && 
          <UserNotification
            icon={<AiFillExclamationCircle/>}
            logocolor='#ff0000'
            title="Error!"
            message={errMess}
          />
      }
            <div className="flex pt-[2%] pl-[3%]">
              <div className="flex items-center w-[57%]">
                <FaClipboardList className="text-[1.5em]" />
                <h1 className="text-[1.8em] font-medium pl-[0.5%]">
                  Task Board
                </h1>
              </div>
              <div className="flex w-[43%] relative z-1">
                <FaSearch className="text-[1.2em] absolute top-[26%] ml-[2%] text-[#707070]" />
                <input
                  type="text"
                  placeholder="Search Task Title or Description..."
                  className="pl-[5%] w-[52%] border-2 rounded-[10px] mr-[1%]"
                  onChange={(e)=>{handleChangeSearch(e)}}
                  value={searchQuery}
                ></input>
                <div className="flex w-[28%] bg-white border-2 rounded-[10px] relative">
                  <h1 className="absolute top-[23%] pl-[5%] font-semibold">
                    Show:
                  </h1>
                  <div className="pl-[32%] py-[6%]">
                    <select
                      className="text-[#707070] focus:outline-none outline-none"
                      value={filter}
                      onChange={(e) => handleChange(e)}
                    >
                      <option value="all">All</option>
                      <option value="pending">Not Started</option>
                      <option value="inprogress">In Progress</option>
                      <option value="completed">Completed</option>
                    </select>
                  </div>
                </div>
                <button
                  className="ml-[1%] bg-white border-[2px] rounded-[10px] px-[2%]"
                  value={order}
                  onClick={() => {
                    setOrder(order == "ASC" ? "DESC" : "ASC");
                  }
                  
                  }
                >
                  {order == "ASC" ?
                  (
                    <Icon
                      className="animate-pop1 text-[#707070]"
                      path={mdiSortCalendarAscending}
                      size={1}
                    />
                  ) : (
                    <Icon
                      className="animate-pop2 text-[#707070]"
                      path={mdiSortCalendarDescending}
                      size={1}
                    />
                  )}
                </button>
              </div>
            </div>

            {/* Second Section */}
            <div>
              <table className="w-[93%] mx-[3%] mt-[1%] text-[#717171] text-[1.2em]">
                <thead className="text-left">
                  {/* Column Labels */}
                  <tr>
                    <th className="w-[25%]">TASK TITLE</th>
                    <th className="w-[50.5%]">TASK DESCRIPTION</th>
                    <th>STATUS</th>
                    <th>
                      <BsThreeDots />
                    </th>
                  </tr>

                  {/* Add Task */}
                  <tr className="hover:cursor-pointer">
                    <td colSpan={4}>
                      <div
                        className="flex items-center my-[0.5%] py-[1%] pl-[2%] border-dashed border-2 border-yellow rounded-[12px] dark:border-black
                                        hover:bg-[#ffd6a8] dark:hover:bg-gray-300"
                        onClick={() => setOpenAddModal(true)}
                      >
                        <FaPlus className="text-secondary text-[1.2em] dark:text-black" />
                        <h1 className="text-[#3C3C3C] text-[1.2em] font-semibold pl-[1.2%]">
                          Add Task
                        </h1>
                      </div>
                    </td>
                  </tr>
                </thead>
              </table>
              {taskExist ? (
                tasks.map((task, index) => (
                  <TaskCard
                    key={index}
                    {...task}
                    handleOptionsClick={handleOptionsClick}
                    isActive={activeTaskId === task.task_id}
                    setShowView={setShowView}
                    setShowEdit={setShowEdit}
                    setShowDelete={setShowDelete}
                  />
                ))
              ) : (
                <div className="mt-[10%] ml-[43%]">
                  <img src={search} alt="Figure Searching" className=""></img>
                  <h1 className="text-[#FB8500] font-bold text-[1.3em] dark:text-black">
                    No Tasks Listed Yet!
                  </h1>
                </div>
              )}
            </div>
          </div>
                        }
        </div>
      </div>
    </div>
  );
}

export default App;
