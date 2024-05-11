import React, { useEffect, useRef, useState } from "react";
import { TaskCardProps } from "../../common/interface";
import { PiDotsThreeOutlineVerticalFill } from "react-icons/pi";
import { FaEye, FaPencilAlt, FaTrashAlt } from "react-icons/fa";
import View from "../side pane/View Details";
import Edit from "../modal/Edit";
import Delete from "../modal/Delete";

const TaskCard: React.FC<TaskCardProps> = (task) => {
  const [showOptions, setShowOptions] = useState(false);
  const pickerRef = useRef<HTMLDivElement>(null);
  const [openEditTask, setOpenEditTask] = useState(false);

  const shortDesc =
    task.description.length > 80
      ? task.description.substring(0, 80) + "..."
      : task.description;

  useEffect(() => {}, []);

  const handleTaskDropdown = (taskId: number) => {
    setOpenEditTask(true);
    localStorage.setItem("cat_id", JSON.stringify(taskId));
  };

  const toggleOptions = (taskId: number) => {
    if (task.isActive) {
      setShowOptions(!showOptions);
    } else {
      setShowOptions(true);
    }
    // console.log(task.isActive," ",showOptions, "Task_ID: ",task.task_id)
    task.handleOptionsClick(taskId);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        pickerRef.current &&
        !pickerRef.current.contains(event.target as Node)
      ) {
        setShowOptions(false);
      }
    };

    if (showOptions) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showOptions]);

  return (
    <div className="relative w-[93%] bg-white mx-[3%] mt-[1%] rounded-lg drop-shadow-md dark:bg-black z-0">
      <table className="w-[100%] text-[#717171] text-[1.2em]">
        <tbody>
          <tr className="text-left">
            <td className="pl-[1%] py-[1.5%] w-[25%] text-[1em] text-[#3C3C3C] font-semibold dark:text-white">
              {task.title}
            </td>
            <td className="font-regular text-[0.8em] w-[48%] text-[#3C3C3C] dark:text-white">
              {shortDesc}
            </td>
            <td className="w-[21.5%]">
              <div
                className={`ml-[4%] text-white text-center font-extrabold text-[0.8em] px-[2%] py-[2%] w-[40%] rounded-[5px]
                            ${
                              task.task_status === "Not Started"
                                ? "bg-secondary dark:bg-white dark:text-secondary"
                                : task.task_status === "In Progress"
                                ? "bg-blue dark:bg-white dark:text-blue"
                                : "bg-[#00A71B] dark:bg-white dark:text-[#00A71B]"
                            }`}
              >
                {task.task_status}
              </div>
            </td>
            <td>
              <PiDotsThreeOutlineVerticalFill
                className="hover:cursor-pointer"
                onClick={() => toggleOptions(task.task_id)}
              />
              {task.isActive && showOptions && (
                <div
                ref={pickerRef}
                className="animate-fade-in absolute bg-white top-[-80%] rounded-[5px] border text-[0.8em] w-[8%] ml-[1%] dark:bg-gray-500 z-0">
                  <ul className="z-[250]">
                    <li
                      className="flex items-center py-[5%] pl-[6%] hover:bg-[#d6d6d6] hover:cursor-pointer dark:text-white
                                    dark:hover:bg-gray-600"
                      onClick={() => {
                        task.setShowView(true);
                        task.handleOptionsClick(0);
                        localStorage.setItem(
                          "task_id",
                          JSON.stringify(task.task_id)
                        );
                      }}
                    >
                      <FaEye />
                      <p className="ml-[3%]">View Task</p>
                    </li>
                    <li
                      className="flex items-center py-[5%] pl-[6%] hover:bg-[#d6d6d6] hover:cursor-pointer dark:text-white
                                    dark:hover:bg-gray-600"
                      onClick={() => {
                        task.setShowEdit(true);
                        task.handleOptionsClick(task.task_id);
                        localStorage.setItem(
                          "task_id",
                          JSON.stringify(task.task_id)
                        );
                      }}
                    >
                      <FaPencilAlt />
                      <p className="ml-[3%]">Edit Task</p>
                    </li>
                    <li
                      className="flex items-center py-[5%] pl-[6%] hover:bg-[#d6d6d6] hover:cursor-pointer dark:text-white
                                    dark:hover:bg-gray-600"
                      onClick={() => {
                        task.setShowDelete(true);
                        task.handleOptionsClick(0);
                        handleTaskDropdown(task.task_id);
                      }}
                    >
                      <FaTrashAlt />
                      <p className="ml-[3%]">Delete Task</p>
                    </li>
                  </ul>
                </div>
              )}
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default TaskCard;
