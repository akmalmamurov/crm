import { useSelector, useDispatch } from "react-redux";
import { logoutUser } from "@/Redux/slices/authSlices";
import { CheckIcon, LogOutIcon, PersonIcon } from "@/assets/icons";

const UserModal = ({ visibleUserModal }) => {
  const dispatch = useDispatch();
  const { sidenavType, theme } = useSelector((state) => state.theme);
  const currentColor = theme[sidenavType];
  return (
    <>
      <div
        data-name="overlay"
        className={
          visibleUserModal
            ? "fixed w-screen h-screen top-0 left-0 z-10"
            : "hidden"
        }
      ></div>

      <div
        className={
          visibleUserModal
            ? `visible fixed top-[9%] z-20 right-[1%] ${
                sidenavType === "white" ? "bg-white" : "bg-darkBg"
              } px-[10px] py-4 rounded-lg transition-all duration-200 shadow-md`
            : "invisible fixed top-[11%] z-20 opacity-0 right-[1%] bg-white px-[10px] py-4 rounded-lg transition-all duration-300 shadow-md"
        }
      >
        <div className="mb-[10px] flex items-center gap-2">
          <PersonIcon className={`${currentColor.text}`} />

          <div className={currentColor.text}>
            <h4 className="text-[13px] font-medium leading-4 mb-2">
              IZZMA CRM
            </h4>
            <p className={`text-[10px] leading-3 text-${currentColor.text}`}>
              Ваш номер клиента 15779911
            </p>
          </div>
        </div>
        <ul className={`text-[13px] ${currentColor.text} font-medium`}>
          <li className="py-[10px] border-t border-t-black/5 uppercase">
            najot talim
          </li>
          <li className="py-[10px] border-t border-t-black/5 uppercase">
            yangisi
          </li>
          <li className="py-[10px] border-t border-t-black/5 uppercase">
            najot talim
          </li>
          <li
            className={`py-[10px] border-t border-t-black/5 uppercase flex items-center  ${currentColor.text}`}
          >
            <CheckIcon className={`${currentColor.text} mr-3`} />
            yangisi
          </li>
          <li className="py-[10px] border-t border-t-black/5 flex items-center">
            <PersonIcon className={`${currentColor.text} mr-3`} />
            Yangi filial qo'shish
          </li>
          <li
            onClick={() => dispatch(logoutUser())}
            className="py-[10px] border-t border-t-black/5 uppercase flex items-center"
          >
            <LogOutIcon
              className={`${currentColor.text} w-[20px] h-[20px] mr-[9px]`}
            />
            Chiqish
          </li>
        </ul>
      </div>
    </>
  );
};

export default UserModal;
