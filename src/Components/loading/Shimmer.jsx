const Shimmer = ({ otherClasses }) => {
  return (
    <div
      className={`rounded-md w-full bg-[#bab9ba] relative before:absolute  overflow-hidden before:top-0 before:left-0  before:inset-0 before:-translate-x-full before:bg-custom-gradient before:animate-[shimmer_1.5s_infinite] ${otherClasses}`}
    ></div>
  );
};

export default Shimmer;
