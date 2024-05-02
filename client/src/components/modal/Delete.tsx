import React from "react";
import { FiX } from "react-icons/fi";
import { GoAlertFill } from "react-icons/go";
/* Modify this Component to add functionalities */

const Delete: React.FC = () => {
  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-md overflow-hidden w-full max-w-sm font-montserrat">
        {/* X close button */}
        <section className="flex justify-end p-2">
          <button>
            <FiX className="text-black text-2xl hover:text-alert" />
          </button>
        </section>

        {/* Vector and Title and Desc */}
        <section className="p-4">
        <div className="flex justify-center">
            <GoAlertFill className="text-alert mb-2 text-center w-16 h-16"/>
        </div>
          <h3 className="font-bold text-2xl text-black mb-4 text-center">
            Are You Sure?
          </h3>
          <p className="font-light text-center">
            Do you want to delete this task? This process cannot be undone.
          </p>
        </section>

        {/* Buttons */}
        <section className="flex justify-evenly pb-4">
          <button className="button bg-gray-400 text-white p-[0.5em] w-[30%] rounded-md hover:bg-gray-500 font-bold transition-colors delay-250 duration-[3000] ease-in">
            Cancel
          </button>
          <button className="button bg-alert text-white p-[0.5em] w-[30%] rounded-md hover:bg-red-400 font-bold transition-colors delay-250 duration-[3000] ease-in">
            Delete
          </button>
        </section>

      </div>
    </div>
  );
};

export default Delete;
