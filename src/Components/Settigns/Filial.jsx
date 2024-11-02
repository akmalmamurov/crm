import { useState } from "react";
import SiteLog from "../../assets/images/loginLogo.png";
import Info from "../Info";
import EditFilialForm from "../EditFilialForm";

const Filial = () => {
  const [editFilialForm, setEditFilialForm] = useState(false)

  const filialInfo = [
    {
      title: "Branch name",
      subtitle: "Inter nation",
    },
    {
      title: "Telefon raqami",
      subtitle: "+99899 563-32-98",
    },
    {
      title: "Holat",
      subtitle: "Active",
    },
    {
      title: "Balance",
      subtitle: "0",
    },
    {
      title: "Subdomain",
      subtitle: "soffit",
    },
    {
      title: "Timeout",
      subtitle: "23:59:00 05-04-2024",
    },
  ];

  const secondFilialInfo = [
    {
      title: "Mode",
      subtitle: "Light",
    },
    {
      title: "Region",
      subtitle: "Toshkent",
    },
    {
      title: "Branch",
      subtitle: "Oybek",
    },
  ];

  window.addEventListener("click", (e) =>  {
    const el = e.target.getAttribute("data-name")

    if(el === "overlay") {
      setEditFilialForm(false)
    }
  })
  return (
    <>
      <div className="relative w-full h-auto py-[80px] pl-[55px] pr-[49px]  bg-white rounded-lg flex  items-start justify-between">
        <div className="w-[403px]">
          {filialInfo.map((info, i) => (
            <Info title={info.title} subtitle={info.subtitle} key={i} />
          ))}
        </div>

        <div className="w-[403px]">
          <div className="ml-auto w-3/4 text-center">
            <div
              className="w-[169px] h-[169px] mx-auto mb-[103px] rounded-full bg-graySecond flex items-center justify-center"
            >
              <img src={SiteLog} alt="site image" className="w-[77px] h-[70px]" />
            </div>
            <div className="flex flex-col items-end justify-center mb-[42px]">
              {secondFilialInfo.map((item, i) => (
                <Info title={item.title} subtitle={item.subtitle} key={i} />
              ))}
            </div>

            <button onClick={() => setEditFilialForm(true)} className="w-[220px] h-[46px] bg-blueTifany text-lg font-medium text-white rounded-md">
              Tahrirlash
            </button>
          </div>
        </div>
        <EditFilialForm showModal={editFilialForm} closeModal={() => setEditFilialForm(false)}/>
      </div>
    </>
  );
};

export default Filial;
