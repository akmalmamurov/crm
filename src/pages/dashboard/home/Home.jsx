import Navbar from "@/layout/Navbar";
import { useMemo } from "react";
import { PersonIcon } from "@/assets/icons";
import { useTranslation } from "@/hooks";

const Home = () => {
  const filterDate = useMemo(
    () => ["Kecha", "Bugun", "Hafta", "Oy", "Vaqt"],
    []
  );
  const t = useTranslation();
  return (
    <>
      <Navbar
        navHeading={t.navHeading}
        buttonContent={"O'quvchilarni qo'shish"}
        searchIcon={true}
        docIcon={true}
      />

      <div className="pt-[40px]">
        <div className="flex items-center justify-center gap-x-[16px] mb-[100px]">
          {filterDate.map((item, i) => (
            <button key={i} className="px-[12px] py-[8px] bg-white rounded-md">
              {item}
            </button>
          ))}
        </div>

        <div className="py-[4px] px-[6px] rounded-[15px] flex items-center mx-auto mb-[10px] w-[155px] gap-x-[5px] bg-[#E8EDFB]">
          <button className="w-[69px] h-[19px] rounded-[15px] bg-blue"></button>
          <button className="w-[69px] h-[19px] rounded-[15px] bg-white"></button>
        </div>
        <div className="grid lg:grid-cols-2 md:grid-cols-2 sm:grid-cols-1 grid-cols-1 items-center justify-between gap-[11px]">
          <div className="h-[439px] bg-white py-[26px] px-[23px] rounded-[9px]">
            <h2 className="text-[20px] text-black  leading-[32px] mb-[23px]">
              Tizimdan foydalanish
            </h2>

            <h4 className="text-[20px] text-blueTifany leading-[32px] mb-[19px]">
              Xodimlar
            </h4>
            <ul>
              <li className="flex pb-[9px] text-[13px] font-semibold border-b-2 border-green mb-[16px]">
                <PersonIcon className="w-[14px] h-[16px] object-cover mr-[6px]" />

                <h2 className="text-black flex-1">Odilov Qodirjon</h2>
                <h4 className="text-black ">12 soat 45 minut</h4>
              </li>
              <li className="flex pb-[9px] text-[13px] font-semibold border-b-2 border-yellow mb-[16px]">
                <PersonIcon className="w-[14px] h-[16px] object-cover mr-[6px]" />
                <h2 className="text-black flex-1">Odilov Qodirjon</h2>
                <h4 className="text-black ">12 soat 45 minut</h4>
              </li>
              <li className="flex pb-[9px] text-[13px] font-semibold border-b-2 border-red">
                <PersonIcon className="w-[14px] h-[16px] object-cover mr-[6px]" />
                <h2 className="text-black flex-1">Odilov Qodirjon</h2>
                <h4 className="text-black ">12 soat 45 minut</h4>
              </li>
            </ul>
          </div>
          <div className="h-[439px] bg-white py-[26px] px-[23px] rounded-[9px]">
            <div className="grid lg:grid-cols-2 md:grid-cols-1 sm:grid-cols-2 grid-cols-1 items-center justify-between mb-[24px]">
              <h2 className="text-[20px] text-black  leading-[32px]">
                Qarzdorlar Guruhi
              </h2>
              <h2 className="text-[20px] text-black  leading-[32px]">
                Umumiy qarzdorlik: 0
              </h2>
            </div>

            <div className="flex items-center justify-between mb-[19px]">
              <h4 className="text-[20px] text-blueTifany leading-[32px]">
                Guruh
              </h4>
              <h4 className="text-[20px] text-grayThird leading-[32px] ">
                Summa
              </h4>
            </div>
            <ul>
              <li className="flex pb-[9px] text-[13px] font-semibold border-b-2 border-green mb-[16px]">
                <h2 className="text-black flex-1">Matematika</h2>
                <h4 className="text-black ">$12 000 000</h4>
              </li>
              <li className="flex pb-[9px] text-[13px] font-semibold border-b-2 border-red">
                <h2 className="text-black flex-1">Rus tili</h2>
                <h4 className="text-black ">$12 000 000</h4>
              </li>
            </ul>
          </div>
        </div>

        <div className="flex items-center justify-between gap-x-[11px]"></div>
      </div>
    </>
  );
};
export default Home;
