import React, { useEffect, useState } from "react";
import {
  Users,
  CalendarDays,
  MapPin,
  Clock,
  LoaderIcon,
  PlusCircle,
} from "lucide-react";
import { useDispatch } from "react-redux";
import { showNotify } from "../../sotre/slices/NotificationToast";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const [userCount, setUserCount] = useState(0);
  const [events, setEvents] = useState([]);
  const [waiting, setWaiting] = useState(true);
  const dispatch = useDispatch();

  const navigate = useNavigate();
  useEffect(() => {
    fetch(`${import.meta.env.VITE_API_URL}/dashboard-data`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) {
          dispatch(
            showNotify({
              title: "avertissement",
              text: "Une erreur est survenue lors du chargement des données. Veuillez actualiser la page et réessayer.",
              success: true,
            })
          );
          setWaiting(false);
          return;
        }
        return res.json();
      })
      .then((data) => {
        setUserCount(data.totalUsers);
        setEvents(data.events);
        setWaiting(false);
      })
      .catch((err) => {
        dispatch(
          showNotify({
            title: "avertissement",
            text: "Une erreur est survenue lors du chargement des données. Veuillez actualiser la page et réessayer.",
            success: true,
          })
        );
        setWaiting(false);
      });
  }, [dispatch]);

  return (
    <div className="p-6 space-y-6 bg-gray-100 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-800">Tableau de bord</h1>

      <div className="grid gap-6 grid-cols-1 sm:grid-cols-2">
      <div className="mt-6 flex flex-wrap gap-4 md:order-3">
          <button
            onClick={() => navigate("add-event")}
            className="flex items-center space-x-2 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Ajouter un événement</span>
          </button>

          <button
            onClick={() => navigate("add-schedules")}
            className="flex items-center space-x-2 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
          >
            <PlusCircle className="w-5 h-5" />
            <span>Ajouter un emploi du temps</span>
          </button>
        </div>
        <div className="bg-white shadow rounded-xl p-6 hover:shadow-md transition">
          <div className="flex items-center justify-between space-x-2 mb-4">
            <div>
              <CalendarDays className="w-5 h-5 text-blue-600" />
              <h2 className="text-lg font-semibold text-gray-800">
                Événements aujourd'hui
              </h2>
            </div>
            <div>
              <button
                onClick={() => navigate("events")}
                className="py-2 px-3.5 hover:underline text-indigo-600"
              >
                Voir plus Evenement
              </button>
            </div>
          </div>
          {waiting ? (
            <div className="h-11 flex items-center justify-center">
              <LoaderIcon className="h-8 w-8 text-blue-600 animate-spin" />
            </div>
          ) : events.length === 0 ? (
            <p className="text-gray-500">Aucun événement aujourd'hui.</p>
          ) : (
            <ul className="space-y-3">
              {events.map((event) => (
                <li
                  key={event.id}
                  className="border border-gray-200 rounded p-3 hover:bg-gray-50 transition"
                >
                  <h3 className="font-semibold text-gray-700">{event.title}</h3>
                  <div className="flex items-center text-sm text-gray-600 mt-1 space-x-2">
                    <Clock className="w-4 h-4" />
                    <span>{event.time}</span>
                    <MapPin className="w-4 h-4 ml-4" />
                    <span>{event.location }</span>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>


        <div className="bg-white shadow rounded-xl p-6 flex items-center space-x-4 hover:shadow-md transition">
          <div className="bg-indigo-100 text-indigo-600 p-3 rounded-full">
            <Users className="w-6 h-6" />
          </div>
          <div>
            <p className="text-sm text-gray-500">Utilisateurs inscrits</p>
            <h2 className="text-2xl font-semibold">{userCount}</h2>
          </div>
        </div>

        
      </div>
    </div>
  );
};

export default Dashboard;
