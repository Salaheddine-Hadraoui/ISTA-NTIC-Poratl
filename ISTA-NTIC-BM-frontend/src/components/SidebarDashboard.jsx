import React, { useEffect, useRef, useState } from "react";
import {
  Calendar,
  BookOpen,
  Clock,
  LayoutDashboardIcon,
  LucideArrowUpRightFromCircle,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import ".././hamburger.css";
import { useDispatch } from "react-redux";
import { logoutUser } from "../sotre/slices/AuthSlice";

export default function SidebarDashboard({ user }) {
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);
  const Navigate = useNavigate();
  const location = useLocation();
  const sidebarDrop = useRef(null);
  const handleLogOut= async()=>{
    await dispatch(logoutUser())
  }


  useEffect(() => {
    const handleClickOutside = (event) => {
      if (sidebarDrop.current && !sidebarDrop.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const toggleSidebar = () => setOpen(!open);

  return (
    <div className="relative md:w-fit" ref={sidebarDrop}>
      <div className={`xl:hidden fixed top-16 left-3 z-50 ${open && "left-50 transition-all duration-300"}`}>
  <label className="hamburger block cursor-pointer border-0.5 rounded-md border-slate-200 bg-white shadow-2xl shadow-slate-950/90">
    <input
      type="checkbox"
      className="hidden peer"
      checked={open}
      onChange={toggleSidebar}
    />
    <svg
      viewBox="0 0 32 32"
      className="h-10 w-10 transition-transform duration-[600ms] ease-[cubic-bezier(0.4,0,0.2,1)] peer-checked:rotate-[-45deg]"
    >
      <path
        className="line line-top-bottom"
        d="M27 10 13 10C10.8 10 9 8.2 9 6 9 3.5 10.8 2 13 2 15.2 2 17 3.8 17 6L17 26C17 28.2 18.8 30 21 30 23.2 30 25 28.2 25 26 25 23.8 23.2 22 21 22L7 22"
      ></path>
      <path className="line" d="M7 16 27 16"></path>
    </svg>
  </label>
</div>


      <div
      
      className={`bg-gradient-to-b from-gray-900 via-slate-700 to-slate-500 text-white shadow-xl rounded-r-md pl-7 pr-0 pt-7 md:pl-5 md:pr-5 md:w-60 transition-all duration-300 ease-in-out
        ${open ? "block fixed top-18 left-0 z-40 w-60" : "hidden xl:block"}`}
        style={{ height: "calc(100vh - 74px)" }}
      >
       <div className="shrink-0 h-23 sm:h-28 md:h-16 lg:h-14 hover:h-32 transition-all duration-150 block mb-3 overflow-hidden px-4 sm:px-6">
  <div className="flex flex-row items-center space-x-3 mb-3">
    <img
      className="inline-block md:w-12 md:h-12 w-9 h-9 rounded-full object-cover border border-white shrink-0"
      referrerPolicy="no-referrer"
      src={user.client_avatar ? user.client_avatar : 'https://avatar.iran.liara.run/public/boy?username=Ash'}
      alt="Avatar"
    />
    <div className="text-center sm:text-left">
      <h3 className="font-semibold text-white text-sm">{user.name}</h3>
      <p className="text-xs text-blue-200 truncate max-w-full">{user.email}</p>
    </div>
  </div>
  <div className="flex justify-center sm:justify-start">
    <button
      onClick={handleLogOut}
      className="text-white px-4 py-2 sm:py-3 text-sm cursor-pointer hover:bg-white/5 hover:text-red-400 shadow-2xl shadow-[#2f3c53] rounded-md transition-colors ease-linear flex items-center space-x-1"
    >
      <span>Déconnexion</span>
      <LucideArrowUpRightFromCircle size={18} />
    </button>
  </div>
</div>


        <button
        onClick={()=>{location.pathname !== "/dashboard" ? Navigate(-1) : null}}
         className="cursor-pointer flex items-center space-x-2 text-white mb-4 pb-3 border-b-2 border-amber-50">
          <LayoutDashboardIcon className="h-6 w-6" />
          <span className=" text-lg font-semibold">Tableau de bord</span>
        </button>
        <nav className="space-y-2 flex justify-center items-center flex-col">
          <SidebarButton
            to="events"
            active={
              location.pathname === "/dashboard/events" ||
              location.pathname === "/dashboard/add-event"
            }
            icon={<Calendar className="h-5 w-5" />}
            label="Events"
            onClick={() => {
              Navigate("events");
              setOpen(false);
            }}
          />
          <SidebarButton
            to="schedule"
            active={
              location.pathname === "/dashboard/schedule" ||
              location.pathname === "/dashboard/add-schedule"
            }
            icon={<Clock className="h-5 w-5" />}
            label="Schedule"
            onClick={() => {
              Navigate("schedule");
              setOpen(false);
            }}
          />
          <SidebarButton
            to="lessons"
            active={
              location.pathname === "/dashboard/lessons" ||
              location.pathname === "/dashboard/add-lesson"
            }
            icon={<BookOpen className="h-5 w-5" />}
            label="Lessons"
            onClick={() => {
              Navigate("lessons");
              setOpen(false);
            }}
          />
        </nav>
      </div>
    </div>
  );
}

function SidebarButton({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`w-full transition duration-200 cursor-pointer
        flex items-center space-x-2 px-4 py-2 rounded-l-lg ${
        active
          ? "bg-white text-indigo-800 shadow-md font-bold"
          : "text-blue-100 hover:bg-gray-900 hover:scale-[1.03]"
      }`}
    >
      {icon}
      <span>{label}</span>
    </button>
  );
}
