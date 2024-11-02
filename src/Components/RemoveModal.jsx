const RemoveModal = (props) => {
    const {
      returnModal,
      setReturnModal,
      returnItem,
      returnLoading,
      itemId,
      groupId,
      closeMoreModal,
      text
    } = props;
  
    const handleDelete = async (id) => {
      let variables = {}
      if(groupId) {
       variables = {
        id: id,
        groupId
       }
      } else {
        variables = {
          id
        }
      }
      try {
        await returnItem({
          variables: {
            ...variables
          },
        });
        setReturnModal(false);
        closeMoreModal();
      } catch (error) {
        console.log(error);
      }
    };
  
    return (
      <div
        className={`fixed top-0 left-0 right-0 bottom-0 w-full h-full z-[100] bg-black bg-opacity-50 ${
          returnModal ? "block" : "hidden"
        } `}
      >
        <div
          className={`fixed top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] z-[101] w-[260px] h-[134px] bg-white duration-150 rounded-md pt-[28px] pb-[16px] ${
            returnModal ? "visible" : "invisible opacity-0"
          }`}
        >
          <h2 className="w-[200px] text-[13px] font-bold leading-[16px] text-center text-black mb-[30px] mx-auto">
            Haqiqatdan ham {text} ?
          </h2>
          <div className="flex items-center justify-around gap-x-[10px]">
            <button
              onClick={() => setReturnModal(false)}
              className="bg-grayThird rounded-md  text-white h-[30px] px-[41px] "
            >
              Yoq
            </button>
            <button
              onClick={() => handleDelete(itemId)}
              className="bg-blue rounded-md  text-white h-[30px] px-[41px] mr-[10px]"
            >
              {returnLoading ? (
                <span className="loader"></span>
              ) : (
                <span className="inline-block">Ha</span>
              )}
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default RemoveModal;
  