const Info = ({title, subtitle}) => {
  return (
    <>
     <div className="w-full flex items-center font-medium mb-[56px] last:mb-0">
        <h2 className="text-xl text-grayThird">{title}</h2>
        <div className="flex-grow border-b-2 h-[15px] border-dotted border-gray-500"></div>
         {/* <hr /> */}
         <h4 className="text-[15px] text-black right-0">{subtitle}</h4>
     </div>
    </>
  );
};

export default Info;
