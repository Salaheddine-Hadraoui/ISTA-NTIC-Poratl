import { Outlet, useLocation, Navigate } from "react-router-dom";
import Navigation from "./components/Navigation";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "./sotre/slices/EventSlice";
import { setUser } from "./sotre/slices/AuthSlice";
import { fetchCourses } from "./sotre/slices/CoursSlice";
import { fetchSchedules } from "./sotre/slices/ScheduleSlice";

function App(){
  const location = useLocation();
  const { role } = useSelector((state) => state.authUser);
  const dispatch = useDispatch();
  useEffect(() => {
    window.scroll(0, 0);
  }, [location.pathname]);

  useEffect(() => {
    const token = localStorage.getItem("auth_token");
    if (!token) return;
    const fetchUser = async () => {
      const res = await fetch(`${import.meta.env.VITE_API_URL}/restoreME`, {
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "application/json",
        },
      });
      const data = await res.json();
      if (!res.ok) return;
      dispatch(setUser(data));
      return data.role === "admin" && <Navigate to={"/dashboard"} />;
    };
    fetchUser();
  }, []);
  useEffect(() => {
    async function fetchEventData() {
      await dispatch(fetchEvents({ urlApi: "getevents", methodHTTP: "GET" }));
    }
    async function fetchCoursesData() {
      await dispatch(fetchCourses({ urlApi: "getcourses", methodHTTP: "GET" }));
    }
    async function fetchScheduleData() {
      await dispatch(fetchSchedules({
        urlApi: "getschedules",
        methodHTTP: "GET"
      }));
    }
    fetchEventData();
    fetchCoursesData();
    fetchScheduleData();
  }, []);
  const [isLogOut, setIsLogOut] = useState(false);

  if (isLogOut) {
    return <Loader />;
  }
  return (
    <>
      <header className="sticky top-0 z-50">
        <Navigation setIsLogOut={setIsLogOut} />
      </header>
      <main className="h-fit">
        <Outlet />
      </main>
      {(role === "admin" && location.pathname.includes("dashboard")) ? null : (
        <Footer />
      )}
    </>
  );
}

export default App;
