import { useState } from "react";
import NotificationAccardion from "./NotificationAccardion";

const NotificationModal = ({ visibleNotifModal }) => {
  const [notificationList] = useState([
    {
      title: "Soff It CRM Pro",
      class: "red",
      text: "Ваш номер клиента 15779911- Lorem ipsum — классический текст-«рыба» Является кажённым трывком из философского трактата  Марка Туллия Цицерона «О пределах.",
      date: "8.11.2021",
      time: "15:37",
    },
    {
      title: "Soff It CRM Pro",
      class: "red",
      text: "Ваш номер клиента 15779911- Lorem ipsum — классический текст-«рыба» Является кажённым трывком из философского трактата  Марка Туллия Цицерона «О пределах.",
      date: "8.11.2021",
      time: "15:37",
    },
    {
      title: "Soff It CRM Pro",
      class: "red",
      text: "Ваш номер клиента 15779911- Lorem ipsum — классический текст-«рыба» Является кажённым трывком из философского трактата  Марка Туллия Цицерона «О пределах.",
      date: "8.11.2021",
      time: "15:37",
    },
  ]);

  return (
    <>
      <div
        data-name="overlay"
        className={
          visibleNotifModal
            ? "fixed w-screen h-screen top-0 left-0 z-10"
            : "hidden"
        }
      ></div>
      <div
        className={
          visibleNotifModal
            ? "visible fixed top-[9%] right-[4%] bg-white w-[340px] py-[15px] px-[10px] border border-grayLight rounded-[10px] z-20  transition-all duration-200 ease-linear notification-modal"
            : "invisible fixed top-[11%] right-[4%] bg-white w-[340px] py-[15px] px-[10px] border border-grayLight rounded-[10px] transition-all z-20 duration-200 ease-linear opacity-0"
        }
      >
        <nav className="flex items-center gap-x-[6px] mb-[25px]">
          <button className="py-[6px] px-[10px] rounded-[4px] text-[14px] duration-150 bg-graySecond focus:bg-blueTifany text-black focus:text-white">
            Все
          </button>
          <button className="py-[6px] px-[10px] rounded-[4px] text-[14px] duration-150 bg-graySecond focus:bg-blueTifany text-black focus:text-white">
            Не прочитоные
          </button>
          <button className="py-[6px] px-[10px] rounded-[4px] text-[14px] duration-150 bg-graySecond focus:bg-blueTifany text-black focus:text-white ">
            Избранный
          </button>
        </nav>

        <div>
          {notificationList.map((item, index) => (
            <NotificationAccardion key={index} item={item} />
          ))}
        </div>
      </div>
    </>
  );
};

export default NotificationModal;
