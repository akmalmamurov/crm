import { Link, NavLink, useLocation } from "react-router-dom";
import { useRef, useState } from "react";
import SidebarSecondary from "../Components/SidebarSecondary";
import classNames from "classnames";
import { useQuery } from "@apollo/client";
import { GET_FUNNEL } from "../adapters/Queries/funnel/funnel";
import {
  CourseIcon,
  FinanceIcon,
  GroupsIcon,
  HomeIcon,
  LeadsIcon,
  LogoIcon,
  QuestionIcon,
  SettingsIcon,
  StudentsIcon,
  TablesIcon,
  CalendarIcon,
} from "@/assets/icons";
import useCurrentColor from "@/hooks/useCurrentColor";
import { useTranslation } from "@/hooks";

const Sidebar = () => {
  const [activeMenus, setActiveMenus] = useState(null);
  const sidebarLinks = useRef();
  const t = useTranslation();
  const pathName = useLocation().pathname;

  const { data: funnelData } = useQuery(GET_FUNNEL);

  const tabs = [
    {
      icon: <HomeIcon />,
      link: "/",
      button: false,
    },
    {
      icon: <TablesIcon />,
      link: "/tasks",
      button: false,
    },
    {
      icon: <LeadsIcon />,
      link: "/leads",
      button: true,
      sidebarMenuName: "Lead menu",
    },
    {
      icon: <StudentsIcon />,
      link: "/students",
      button: false,
    },
    {
      icon: <GroupsIcon />,
      link: "/groups",
      button: false,
    },
    {
      icon: <CalendarIcon />,
      link: "/calendar",
      button: false,
    },
    {
      icon: <CourseIcon />,
      link: "/category",
      button: true,
      sidebarMenuName: "Course menu",
    },
    {
      icon: <FinanceIcon />,
      link: "/finance",
      button: true,
      sidebarMenuName: "Finance menu",
    },
    {
      icon: <SettingsIcon />,
      link: "/settings",
      button: true,
      sidebarMenuName: "Setting menu",
    },
  ];

  const courseLinks = {
    title: t.sections,
    navigationLinks: [
      {
        path: "/category/courses",
        title: t.courses,
      },
      {
        path: "/category/colleagues",
        title: t.employees,
      },
      {
        path: "/category/rooms",
        title: t.rooms,
      },
      {
        path: "/category/archive-collegues",
        title: t.archive,
      },
    ],
  };

  const financeLinks = {
    title: t.finance,
    navigationLinks: [
      {
        path: "/finance/payments",
        title: t.payments,
      },
      {
        path: "/finance/costs",
        title: t.expenses,
      },
      {
        path: "/finance/course-payments",
        title: t.coursePayment,
      },
      {
        path: "/finance/group-payments",
        title: t.groupPayment,
      },
    ],
  };

  const settingsLinks = {
    title: t.settings,
    navigationLinks: [
      {
        path: "/settings/lead-setting",
        title: t.leads,
      },
      {
        path: "/settings/event-logs",
        title: t.events,
      },
      {
        path: "/settings/payment",
        title: t.payments,
      },
      {
        path: "/settings/private-setting",
        title: t.settings,
      },
    ],
  };

  const leadsLinks = {
    title: "Varonkalar",
    navigationLinks: funnelData?.funnels?.map((funnel) => {
      return {
        path: `/leads/${funnel.funnelId}`,
        title: funnel.funnelName,
      };
    }),
  };

  const handleClose = () => {
    setActiveMenus(null);
  };

  const sidebarSecondaryInfo = [
    {
      links: courseLinks,
      open: activeMenus === "Course menu",
      close: handleClose,
    },
    {
      links: financeLinks,
      open: activeMenus === "Finance menu",
      close: handleClose,
    },
    {
      links: settingsLinks,
      open: activeMenus === "Setting menu",
      close: handleClose,
    },
    {
      links: leadsLinks,
      open: activeMenus === "Lead menu",
      close: handleClose,
    },
  ];

  const currentColor = useCurrentColor();

  return (
    <>
      <section
        className={`fixed top-0 left-0 ${currentColor.bg} w-[60px] xl:w-[80px] p-2 xl:p-4 z-[99] h-[100vh] flex flex-col items-center overflow-hidden`}
      >
        <Link to="/">
          <LogoIcon className={`mb-4 w-8 h-8 xl:w-12 xl:h-12`} />
        </Link>

        <nav>
          <ul className="list-none flex items-center flex-col relative gap-2 xl:gap-[4px]">
            {tabs.map((tab, index) => {
              if (!tab.button) {
                return (
                  <NavLink
                    key={index}
                    to={tab.link}
                    onClick={() => {
                      setActiveMenus(null);
                    }}
                    className={({ isActive }) =>
                      isActive
                        ? `group w-12 h-11 flex justify-center items-center ${currentColor.active} cursor-pointer rounded-lg duration-300`
                        : `group w-12 h-11 flex justify-center items-center ${currentColor.icon} ${currentColor.hover} cursor-pointer rounded-lg duration-300`
                    }
                  >
                    {tab.icon}
                  </NavLink>
                );
              } else {
                return (
                  <li
                    ref={sidebarLinks}
                    key={index}
                    onClick={(e) => {
                      e.stopPropagation();
                      activeMenus !== tab.sidebarMenuName
                        ? setActiveMenus(tab.sidebarMenuName)
                        : setActiveMenus(null);
                    }}
                    className={classNames(
                      `group w-12 h-11 flex justify-center items-center cursor-pointer rounded-lg duration-300`,
                      {
                        [currentColor.active]:
                          pathName.includes(tab.link) ||
                          activeMenus === tab.sidebarMenuName,
                        [currentColor.hover]:
                          activeMenus !== tab.sidebarMenuName,
                      }
                    )}
                  >
                    <span
                      className={classNames(
                        `duration-300 group-hover:text-blueTifany`,
                        {
                          [currentColor.textBlue]:
                            pathName.includes(tab.link) ||
                            activeMenus === tab.sidebarMenuName,
                          [currentColor.icon]:
                            !pathName.includes(tab.link) &&
                            activeMenus !== tab.sidebarMenuName,
                        }
                      )}
                    >
                      {tab.icon}
                    </span>
                  </li>
                );
              }
            })}
          </ul>
        </nav>
        <span className="mt-auto w-12 text-lightIcon">
          <QuestionIcon />
        </span>
      </section>
      {sidebarSecondaryInfo.map((info, index) => {
        return (
          <SidebarSecondary
            key={index}
            ref={sidebarLinks}
            links={info.links}
            handleOpen={info.open}
            handleClose={info.close}
          />
        );
      })}
    </>
  );
};

export default Sidebar;
