import { UserCircle } from "lucide-react";
import React, { useRef, useState, useEffect } from "react";
import { logoutUser } from '../sotre/slices/AuthSlice'
import { useDispatch } from "react-redux";

export default function UserAvatar({ user , setIsLogOut}) {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const dropUser = useRef(null);
   const handleLogOut = async ()=>{
    setIsLogOut(true)
    await dispatch(logoutUser())
    setTimeout(()=>{
      setIsLogOut(false)
    },600);
  }

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropUser.current && !dropUser.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative" ref={dropUser}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="text-white px-3 py-1.5 rounded-full flex items-center justify-center gap-2 hover:bg-[#0e131e] focus:ring-1 focus:ring-bg-[#0e131e]"
      >
        <span className="hidden md:inline ">{user.name}</span>
        <img
                className="inline-block shrink-0 w-10 h-10 rounded-full object-cover border border-white"
                referrerPolicy="no-referrer" 
                src={user.client_avatar ? user.client_avatar : 'https://avatar.iran.liara.run/public/boy?username=Ash'}
                alt="Avatar"
              />
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 z-99 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-52 border-blue-500 border-1">
          <div className="px-4 py-3 text-sm text-gray-900 dark:text-white">
            <div className="font-medium truncate text-gray-900 text-lg">
              {user?.name }
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400">
              {user?.email }
            </div>
          </div>
          <div className="py-2">
            <button
            onClick={handleLogOut}
              className="w-full px-4 py-4 text-sm text-red-700 hover:bg-slate-950 transition-colors cursor-pointer"
            >
              Déconnexion
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
