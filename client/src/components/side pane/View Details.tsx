import React, { useEffect, useState } from "react";
import { TbTextSize } from "react-icons/tb";
import { GrTextAlignFull } from "react-icons/gr";
import { FaRegCheckCircle } from "react-icons/fa";
import { IoCloseOutline } from "react-icons/io5";
/*Ty kani niya gamita ang TaskProps sa  interface.ts*/
/*Nag-set napud kog localStorages sa IDs*/
import { TaskProps } from "../../common/interface";
import axios from "axios";
import config from "../../common/config";

const View = ({ onClose }) => {
  const [task, setTask] = useState<TaskProps>();

  const catID = localStorage.getItem("category_id");
  const taskID = localStorage.getItem("task_id");

  useEffect(() => {
    axios
      .get(
        `${config.API}/task/retrieve?col1=category_id&val1=${catID}&col2=task_id&val2=${taskID}&order=DESC`
      )
      .then((res) => {
        console.log("Response: ", res);
        if (res.data.success == true) {
          console.log("Task Identifier:", res.data.tasks[0].task_id);
          setTask(res.data.tasks[0]);
        }
      })
      .catch((err) => {
        console.log(err);
        console.log(taskID);
        console.log(catID);
      });
  }, []);
  return (
    <div className="overflow-hidden animate-slide-left absolute right-0 z-[250] font-montserrat h-screen">
      {task && (
        <div className="h-full w-[23vw] flex flex-col bg-white shadow-xl drop-shadow-2xl dark:bg-[#242424]">
          {/* Task Details Header */}
          <div className="h-[13vh] w-full border-b-[1px] border-[#B3B3B3]">
            <div className="mx-[7%] pt-[7%] flex items-center justify-between">
              <h1 className="text-[2em] font-bold text-[#023047] dark:text-white">
                Task Details
              </h1>
              <IoCloseOutline
                className="border border-[#D9D9D9] rounded-[5px] text-[#ACACAC] text-[2.2em] hover:cursor-pointer hover:text-[#023047] hover:border-[#023047] 
           hover:animate-shake dark:hover:text-white dark:hover:border-white"
                onClick={onClose}
              />
            </div>
            <div className="mx-[7%] pt-[1%] flex items-center">
              <p className="text-[#9D9D9D] dark:text-white">Created at</p>
              <p className="text-[#9D9D9D] font-semibold ml-[2%] ">
                {new Date(task.time_stamp).toLocaleString()}
              </p>
            </div>
          </div>

          {/* Details */}
          <div className="h-[15vh] w-full">
            {/* Title */}
            <div className="mx-[7%] pt-[7%] flex items-center">
              <TbTextSize className="text-[1.5em] dark:text-white" />
              <p className="text-[1.3em] font-semibold ml-[3%] dark:text-white">
                {" "}
                Title
              </p>
            </div>
            <div className="ml-[16%] pt-[1%] flex">
              <p className="text-[1.2em] text-[#023047] font-regular dark:text-white">
                {task.title}
              </p>
            </div>

            {/* Description */}
            <div className="items-center mx-[7%] pt-[10%] flex">
              <GrTextAlignFull className="text-[1.5em] dark:text-white" />
              <p className="text-[1.3em] font-semibold ml-[3%] dark:text-white">
                {" "}
                Task Description
              </p>
            </div>
            <div className="ml-[16%] pt-[1%] w-[17vw] flex">
              <p className="text-[1.2em] text-[#023047] font-regular text-justify dark:text-white">
                {task.description}
              </p>
            </div>

            {/* Status */}
            <div className="mx-[7%] pt-[10%] flex items-center">
              <FaRegCheckCircle className="text-[1.5em] dark:text-white" />
              <p className="text-[1.3em] font-semibold ml-[3%] dark:text-white">
                {" "}
                Status:
              </p>
            </div>
            <div className="ml-[15%] mt-[2%] w-[11vw] flex">
              <div
                className={`py-[3%] px-[8%] ${
                  task.task_status === "Not Started"
                    ? "bg-secondary dark:bg-secondary dark:text-white"
                    : task.task_status === "In Progress"
                    ? "bg-blue dark:bg-blue dark:text-white"
                    : "bg-[#00A71B] dark:bg-[#00A71B dark:text-white"
                }text-center text-white font-bold rounded-lg`}
              >
                <p className="text-[1.15em]">{task.task_status}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default View;
