import { useTranslation } from "@/hooks";
import useCurrentColor from "@/hooks/useCurrentColor";
import { Link,  useLocation } from "react-router-dom";
const TaskPageHeader = () => {
  const pathName = useLocation().pathname;
  const currentColor = useCurrentColor();
  const t = useTranslation();
  const navigationLink = [
    {
      link: "/tasks",
      title: t.board,
    },
    {
      link: "/tasks/task-tables",
      title: t.table,
    }
  ];
  return (
    <div className="flex items-center justify-between mb-[19px]">
      <div>
        {navigationLink.map((item, i) => (
          <Link
            to={item.link}
            key={i}
            className={`${
              pathName === item.link
                ? "bg-blueTifany text-white"
                : `${currentColor.bg} ${currentColor.text}`
            } px-[22px] py-[12px] text-[14px] rounded-[10px] duration-150 mr-[6px]`}
          >
            {item.title}
          </Link>
        ))}
      </div>

     
    </div>
  );
};

export default TaskPageHeader;
