import React from "react";

const CancelLesson = ({
  showModal,
  setShowModal,
  setShowGroupDateOptions,
  updateGroupStatus,
  loading,
  attendId,
  groupId,
}) => {
  const handleClick = async () => {
    try {
      await updateGroupStatus({
        variables: {
          attendId,
          groupId,
          attendStatus: 2,
        },
      });
      setShowModal(false);
      setShowGroupDateOptions("");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div
        className={`fixed top-0 left-0 right-0 bottom-0 w-full h-full z-[100] bg-lightestBlack ${
          showModal ? "block" : "hidden"
        } `}
      ></div>

      <div
        className={`fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[101] w-[260px] h-[134px] bg-white duration-100 rounded-md pt-[28px] pb-[16px] ${
          showModal ? "visible" : "invisible opacity-0"
        }`}
      >
        <h2 className="w-[200px] text-[13px] font-bold leading-[16px] text-center text-black mb-[30px] mx-auto">
          Haqiqatdan ham bekor qilishni xohlaysizmi ?
        </h2>
        <div className="flex items-center justify-around gap-x-[10px]">
          <button
            onClick={() => setShowModal(false)}
            className="bg-grayThird rounded-md  text-white h-[30px] px-[41px] "
          >
            Yo'q
          </button>
          <button
            onClick={handleClick}
            className="bg-red rounded-md  text-white h-[30px] px-[41px] mr-[10px]"
          >
            {loading ? (
              <span className="loader"></span>
            ) : (
              <span className="inline-block">Ha</span>
            )}
          </button>
        </div>
      </div>
    </>
  );
};

export default CancelLesson;
