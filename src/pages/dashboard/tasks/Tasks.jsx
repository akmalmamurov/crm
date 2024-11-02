import { Outlet, useLocation } from "react-router-dom";

import BlackBoard from "@/Components/Blackboard";
import TaskPageHeader from "@/Components/TaskPageHeader";

const Tasks = () => {
  const pathName = useLocation().pathname
  return (
    <>
      <TaskPageHeader/>
       <div className="w-full">
        <Outlet/>
         {pathName === '/tasks' && <BlackBoard/>}
       </div>
    </>
  );
};

export default Tasks;
