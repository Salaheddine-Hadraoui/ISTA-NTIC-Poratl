import {
  createBrowserRouter,
  Navigate,
} from "react-router-dom";
import HomePage from "../pages/HomePage";
import SchedulePage from "../pages/SchedulePage";
import EventsPage from "../pages/EventsPage";
import LessonsPage from "../pages/LessonsPage";
import DashboardPage from "../pages/DashboardPage";
import App from "../App";
import Login from "../pages/Login";
import Entrer from "../pages/Entrer"; 
import Contact from "../pages/Contact";
import EventDasboard from "../pages/Dashboard Components/EventDasboard";
import ShedulesDashboard from "../pages/Dashboard Components/ShedulesDashboard";
import LessonDashboard from "../pages/Dashboard Components/LessonDashboard";
import AddCourseForm from "../pages/Dashboard Components/addLesson";
import Apropos from "../components/Apropos";
import EventDetails from "../pages/EventDetails";
import AddSchedulePage from "../pages/Dashboard Components/addSchedule";
import AddEventPage from "../pages/Dashboard Components/AddEvent";
import UpdateEvent from "../pages/Dashboard Components/UpdateEvent";


const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      {
        index:true,
        element: <HomePage />,
      },
      {
        path: "/schedule",
        element: <SchedulePage />,
      },
      {
        path: "/events",
        element: <EventsPage />,
      },
      {
        path:'/events/:id',
        element:<EventDetails />
      },
      {
        path: "/courses",
        element: <LessonsPage />,
      },
      {
        path: "/contact-nous",
        element: <Contact />,
      },
      {
        path: "/About-us" || "/presentaion",
        element: <Apropos />,
      },
      {
        path: "/dashboard",
        element:  <DashboardPage />,
        children: [
          {
            index: true, 
            path: "events",
            element: <EventDasboard />
          },
          {
            path: "add-event",
            element: <AddEventPage />
          },
          {
            path: "modifier-event/:id",
            element: <UpdateEvent />
          },
          {
            path: "schedule",
            element: <ShedulesDashboard/>
          },
          {
            path: "add-schedule",
            element: <AddSchedulePage />
          },
          {
            path: "lessons",
            element: <LessonDashboard/>
          },
          {
            path: "add-lesson",
            element: <AddCourseForm/>
          }
        ]
      },
     
    ]},
    {
      path: "/entrer",
      element: <Entrer />, // Entrer is the container/layout
      children: [
        {
          index:true,
          path: "join-us", // Relative path inside Entrer
          element: <Login />, // Renders Login page inside Entrer
        },
        // {
        //   path: "forgot-password", // Relative path inside Entrer
        //   element: <ForgotPassword />, // Renders ForgotPassword inside Entrer
        // },
      ],
    }
]);


export default router;
