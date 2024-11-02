const Buttons = ({ buttonContent, setShowForm }) => {
  return (
    <button
      onClick={setShowForm}
      className="bg-blueTifany p-[10px] text-white text-[13px] leading-4 tracking-[0.12px]  rounded-md flex items-center justify-center mr-[15px] hover:bg-blue duration-300"
    >
      {buttonContent}
      <span className="inline-block m-0 p-0 ml-3 text-[18px]">+</span>
    </button>
  );
};

export default Buttons;
