/* eslint-disable react-refresh/only-export-components */
import { lazy } from "react";

const Home = lazy(() => import("@/pages/dashboard/home/Home"));
const Leads = lazy(() => import("@/pages/dashboard/leads/Leads"));
const LeadsProfile = lazy(() =>
  import("@/pages/dashboard/leads-profile/LeadsProfile")
);
const Groups = lazy(() => import("@/pages/dashboard/groups/Groups"));
const GroupProfile = lazy(() =>
  import("@/pages/dashboard/group-profile/GroupProfile")
);
const MyCalendar = lazy(() => import("@/pages/dashboard/calendar/MyCalendar"));
const Students = lazy(() => import("@/pages/dashboard/student/Students"));
const StudentProfile = lazy(() =>
  import("@/pages/dashboard/student-profile/StudentProfile")
);
const TasksPage = lazy(() => import("@/pages/dashboard/tasks/Tasks"));
const TaskTables = lazy(() => import("@/pages/dashboard/tasks/TaskTables"));
const Course = lazy(() => import("@/pages/dashboard/course/Course"));
const Courses = lazy(() => import("@/pages/dashboard/course/courses/Courses"));
const Employers = lazy(() =>
  import("@/pages/dashboard/course/employers/Employers")
);
const CourseProfile = lazy(() =>
  import("@/pages/dashboard/course/course-profile/CourseProfile")
);
const Rooms = lazy(() => import("@/pages/dashboard/course/rooms/Rooms"));
const ArchiveCollegues = lazy(() =>
  import("@/pages/dashboard/course/archive-collegues/ArchiveCollegues")
);
const Finance = lazy(() => import("@/pages/dashboard/finanse/Finance"));
const Payments = lazy(() =>
  import("@/pages/dashboard/finanse/payments/Payments")
);
const Costs = lazy(() => import("@/pages/dashboard/finanse/costs/Costs"));
const GroupPayments = lazy(() =>
  import("@/pages/dashboard/finanse/group-payments/GroupPayments")
);
const CoursePayments = lazy(() =>
  import("@/pages/dashboard/finanse/course-payments/CoursePayments")
);
const Settings = lazy(() => import("@/pages/dashboard/settings/Settings"));
const LeadSetting = lazy(() =>
  import("@/pages/dashboard/settings/lead-setting/LeadSetting")
);
const EventLogs = lazy(() =>
  import("@/pages/dashboard/settings/event-logs/EventLogs")
);
const Payment = lazy(() =>
  import("@/pages/dashboard/settings/payment/Payment")
);
const PrivateSetting = lazy(() =>
  import("@/pages/dashboard/settings/private-setting/PrivateSetting")
);

const routes = [
  { path: "/", element: <Home /> },
  { path: "/leads", element: <Leads /> },
  { path: "/leads/:id", element: <LeadsProfile /> },
  { path: "/groups", element: <Groups /> },
  { path: "/groups/:id", element: <GroupProfile /> },
  { path: "/calendar", element: <MyCalendar /> },
  { path: "/calendar", element: <MyCalendar /> },
  { path: "/students", element: <Students /> },
  { path: "/students/:id", element: <StudentProfile /> },
  {
    path: "/tasks",
    element: <TasksPage />,
    children: [{ path: "task-tables", element: <TaskTables /> }],
  },
  {
    path: "/category",
    element: <Course />,
    children: [
      { path: "courses", element: <Courses /> },
      { path: "courses/:id", element: <CourseProfile /> },
      { path: "colleagues", element: <Employers /> },
      { path: "rooms", element: <Rooms /> },
      { path: "archive-collegues", element: <ArchiveCollegues /> },
    ],
  },
  {
    path: "/finance",
    element: <Finance />,
    children: [
      { path: "payments", element: <Payments /> },
      { path: "costs", element: <Costs /> },
      { path: "course-payments", element: <CoursePayments /> },
      { path: "group-payments", element: <GroupPayments /> },
    ],
  },
  {
    path: "/settings",
    element: <Settings />,
    children: [
      { path: "lead-setting", element: <LeadSetting /> },
      { path: "event-logs", element: <EventLogs /> },
      { path: "payment", element: <Payment /> },
      { path: "private-setting", element: <PrivateSetting /> },
    ],
  },
];

export default routes;
