import { useState } from "react";
import Info from "../Info";
import ProfileImage from "../../assets/images/profile-img.png";
import Buttons from "../navbar-components/NavbarButtons";
import EditProfile from "../EditProfile";

const Profile = () => {
  const [editProfileModal, setEditProfileModal] = useState(false);
  const profileInfo = [
    {
      title: "Name",
      subtitle: "Abdusattor",
    },
    {
      title: "Telefon raqami",
      subtitle: "+99890 861-69-51",
    },
    {
      title: "Jinsi",
      subtitle: "Erkak",
    },
    {
      title: "Til",
      subtitle: "O'zbek",
    },
    {
      title: "Tug'ilgan sanasi",
      subtitle: "15-12-2001",
    },
    {
      title: "Lavozim",
      subtitle: "O'qituvchi",
    },
  ];
  const secondProfileInfo = [
    {
      title: "Region",
      subtitle: "Toshkent",
    },
    {
      title: "Branch",
      subtitle: "Oybek",
    },
  ];

  window.addEventListener("click", (e) => {
    const el = e.target.getAttribute("data-name");

    if (el === "overlay") {
      setEditProfileModal(false);
    }
  });
  return (
    <>
      <div className="w-full h-auto relative py-[80px] pl-[55px] pr-[49px]  bg-white rounded-lg flex  items-start justify-between">
        <div className="w-[403px]">
          {profileInfo.map((info, i) => (
            <Info title={info.title} subtitle={info.subtitle} key={i} />
          ))}
        </div>

        <div className="w-[403px]">
          <div className="ml-auto w-3/4 text-center">
            <img
              src={ProfileImage}
              alt="profile image"
              className="w-[169px]
            h-[169px] mx-auto mb-[103px] rounded-full"
            />
            <div className="flex flex-col items-end justify-center mb-[42px]">
              {secondProfileInfo.map((item, i) => (
                <Info title={item.title} subtitle={item.subtitle} key={i} />
              ))}
            </div>

            <button
              onClick={() => setEditProfileModal(true)}
              className="w-[220px] h-[46px] bg-blueTifany text-lg font-medium text-white rounded-md"
            >
              Tahrirlash
            </button>
          </div>
        </div>

        <EditProfile
          showModal={editProfileModal}
          closeModal={() => setEditProfileModal(false)}
        />
      </div>
    </>
  );
};

export default Profile;
