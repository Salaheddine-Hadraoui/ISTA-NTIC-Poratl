
import { Navigate, Outlet, useLocation} from "react-router-dom";
import SidebarDashboard from "../components/SidebarDashboard";
import { useDispatch, useSelector } from "react-redux";
import { CheckCircleIcon, MessageCircleWarningIcon, X } from "lucide-react";
import { motion } from 'framer-motion';
import { hideNotify } from "../sotre/slices/NotificationToast";
import { useEffect } from "react";
import Dashboard from "./Dashboard Components/dashboard";
export default function DashboardPage() {
  const {role,user} = useSelector((state)=>state.authUser);
  const Location = useLocation();
  //-----------------------------------------------------------
  const {visible ,text,title,success} = useSelector((state)=>state.NotifyAction)

  const dispatch = useDispatch();
  

  if(role === 'user' || !user){
    return <Navigate to={'/'} />
  }

  return (
    <div className="bg-gray-50"
    >
      
      <div className="flex items-stretch">
        {/* Sidebar */}
        <SidebarDashboard user={user}  />

        {/* Main Content */}
        <section className="w-full pt-2 md:p-0">
          {Location.pathname !== '/dashboard' ?
          <Outlet /> :
          <Dashboard />
          }
        </section>
      </div>
      
        {visible && 
          (<SuccessAlert title={title} message={text} hide={()=>{
            dispatch(hideNotify())}}
            success={success}
            />)
        }
        
    </div>
  );
}


 function SuccessAlert({title, message,hide,success}) {
  useEffect(()=>{
    setTimeout(()=>{
      hide()
    },6800)
  })
  
  return (
    <div className="flex flex-col gap-4 w-fit text-xs sm:text-sm z-50 fixed bottom-6 right-4">
    <motion.div
      className={`succsess-alert cursor-default flex items-center justify-between w-full min-w-[260px] sm:min-w-[300px] h-14 sm:h-16 rounded-xl bg-white shadow-sm border
        ${success ? 'shadow-green-400 border-green-400' : 'shadow-red-400 border-red-400'} px-4`}
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      exit={{ scale: 0.8, opacity: 0 }}
      transition={{ type: "spring", stiffness: 120, damping: 12 }}
    >
      <div className="flex gap-3 items-center">
        <div className={`${success ? 'text-green-500' : 'text-red-500'} bg-white/10 backdrop-blur-lg p-2 rounded-full`}>
          {success ? (
            <CheckCircleIcon size={24} />
          ) : (
            <MessageCircleWarningIcon size={24} />
          )}
        </div>
        <div className="flex flex-col">
          <p className={`font-semibold ${success ? 'text-green-600' : 'text-red-600'}`}>{title}</p>
          <p className="text-gray-600 text-[11px] sm:text-xs">{message}</p>
        </div>
      </div>
      <button
        onClick={hide}
        className="cursor-pointer text-gray-500 hover:bg-gray-200 p-2 rounded-full transition"
      >
        <X size={18} />
      </button>
    </motion.div>
  </div>
  
  );
}
