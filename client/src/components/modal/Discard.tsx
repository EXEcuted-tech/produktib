import React from "react";
/* Modify this Component to add functionalities */

const Discard = ({onCancel,onClose}) => {
  return (
    <div className="fixed inset-0 backdrop-brightness-50 flex items-center justify-center p-4 z-[500]">
      <div className="bg-white rounded-lg shadow-md ml-[16%] overflow-hidden w-full max-w-sm font-montserrat">
        {/* Title and Description */}
        <section className="p-4">
          <h3 className="font-bold text-2xl text-black mb-[2%] text-center">
            Discard Changes?
          </h3>
          <p className="font-light text-[1.1em] text-center">
            If you leave, your changes will not be saved.
          </p>
        </section>

        {/* Buttons */}
        <section className="flex justify-evenly pb-4">
          <button className="button bg-lightBlue text-primary p-[0.5em] w-[30%] rounded-md hover:bg-[#0481bf] hover:text-white font-bold transition-colors delay-250 duration-[3000] ease-in"
          onClick={()=>onCancel()}>
            Cancel
          </button>
          <button className="button bg-primary text-white p-[0.5em] w-[30%] rounded-md hover:bg-[#a8e3ff] hover:text-primary font-bold transition-colors delay-250 duration-[3000] ease-in"
          onClick={onClose}>
            Discard
          </button>
        </section>
        
      </div>
    </div>
  );
};

export default Discard;
