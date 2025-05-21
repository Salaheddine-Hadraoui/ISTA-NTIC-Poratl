import React, { useState } from "react";
import ButtonNav from "../../components/ButtonNav";
import { useDispatch, useSelector } from "react-redux";
import { AlertTriangle, Edit, Trash2, X } from "lucide-react";
import Loader from "../../Loader";
import { useNavigate } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import { showNotify } from "../../sotre/slices/NotificationToast";
import { DeleteEvent } from "../../sotre/slices/EventSlice";

export default function EventDasboard() {
  const [confirmDelete, setConfirmDelete] = useState(false);
  const [eventDelete, seteventDelete] = useState({});
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { events, loading } = useSelector((state) => state.EventsData);

  const handleDelete = async (id) => {
    const token = localStorage.getItem("auth_token");
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/adminOnly/deleteEvent/${id}`,
      {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await res.json();

    if (!res.ok) {
      dispatch(
        showNotify({
          title: "Avertissement",
          text: data.message,
          success: data.success,
        })
      );
      return;
    }

    dispatch(DeleteEvent({ id }));
    dispatch(
      showNotify({
        title: "Succès",
        text: data.message,
        success: data.success,
      })
    );
  };

  return (
    <div className="flex-1 p-2 md:p-8 flex-grow relative">
      {confirmDelete && (
        <DeleteConfirmCard
          onClose={() => {
            setConfirmDelete(false);
          }}
          onConfirm={() => {
            handleDelete(eventDelete.id);
          }}
          itemName={eventDelete.name}
        />
      )}
      <div className="mb-4 mt-2 flex justify-between items-center">
        <h1 className="sm:text-xl md:text-2xl font-bold text-gray-900">
          Gestion des événements
        </h1>
        <ButtonNav text={"Ajouter un événement"} to={"../add-event"} />
      </div>
      <div className="relative overflow-auto h-[70svh]">
        <table className="relative w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="bg-gray-50 sticky top-0">
            <tr>
              <th className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Titre
              </th>
              <th className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Date
              </th>
              <th className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Lieu
              </th>
              <th className="px-4 py-2 sm:px-6 sm:py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                Actions
              </th>
            </tr>
          </thead>
          {loading ? (
            <Loader />
          ) : (
            <tbody className="bg-white divide-y divide-blue-200">
              {events && events.length > 0 ? (
                events.map((event) => (
                  <tr key={event.id}>
                    <td className="py-1 px-2 sm:px-4 sm:py-2 whitespace-nowrap">
                      <div className="w-32 sm:w-40 md:w-fit overflow-hidden text-ellipsis">
                        <div className="text-sm font-medium text-gray-900 truncate">
                          {event.title}
                        </div>
                        <div className="text-sm text-gray-500">
                          {event.description.slice(0, 70) + "..."}
                        </div>
                      </div>
                    </td>
                    <td className="py-1 px-2 sm:px-4 sm:py-2 text-sm text-gray-500 w-fit">
                      {event.date}
                    </td>
                    <td className="py-1 px-2 sm:px-4 sm:py-2 text-sm text-gray-500 w-fit">
                      {event.location}
                    </td>
                    <td className="py-1 px-2 sm:px-4 sm:py-2 text-sm font-medium flex items-center gap-2">
                      <button
                        onClick={() =>
                          navigate(`../modifier-event/${event.id}`)
                        }
                        className="text-blue-600 hover:text-blue-900 mr-4 flex items-center gap-2"
                      >
                        <span className="hidden sm:block">Modifier</span>
                        <Edit className="h-4 w-4 sm:h-5 sm:w-5" />
                      </button>
                      <button
                        onClick={() => {
                          setConfirmDelete(true);
                          seteventDelete(event);
                        }}
                        className="text-red-600 hover:text-red-900 flex items-center gap-2"
                      >
                        <span className="hidden sm:block">Supprimer</span>
                        <Trash2 className="h-4 w-4 sm:h-5 sm:w-5" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={4} className="p-3 text-center">
                    {"Il n'y a aucun événement pour cette période"}
                  </td>
                </tr>
              )}
            </tbody>
          )}
        </table>
      </div>
    </div>
  );
}

export const DeleteConfirmCard = ({ itemName, onClose, onConfirm }) => {
  return (
    <AnimatePresence>
      <motion.div
        className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm"
        initial="hidden"
        animate="visible"
        exit="exit"
        variants={{
          hidden: { opacity: 0 },
          visible: { opacity: 1, transition: { duration: 0.2 } },
          exit: { opacity: 0, transition: { duration: 0.2 } },
        }}
        onClick={onClose}
      >
        <motion.div
          className="bg-white rounded-lg shadow-lg max-w-md w-full overflow-hidden"
          variants={{
            hidden: { opacity: 0, scale: 0.95, y: 10 },
            visible: {
              opacity: 1,
              scale: 1,
              y: 0,
              transition: {
                type: "spring",
                stiffness: 300,
                damping: 30,
              },
            },
            exit: {
              opacity: 0,
              scale: 0.95,
              y: 10,
              transition: {
                duration: 0.2,
              },
            },
          }}
          role="dialog"
          aria-modal="true"
          aria-labelledby="delete-confirmation-title"
        >
          <div className="flex items-center justify-between p-4 border-b border-gray-200">
            <h2
              className="text-lg font-semibold text-gray-900"
              id="delete-confirmation-title"
            >
              Confirmer la suppression
            </h2>
            <button
              onClick={onClose}
              className="cursor-pointer text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-300 rounded-full p-1"
            >
              <X size={20} />
              <span className="sr-only">Fermer</span>
            </button>
          </div>

          <div className="p-6">
            <div className="flex gap-4 items-start">
              <div className="flex-shrink-0 bg-red-100 p-2 rounded-full">
                <AlertTriangle className="h-6 w-6 text-red-600" />
              </div>
              <div>
                <p className="text-gray-700">
                  Êtes-vous sûr de vouloir supprimer cet élément ? Cette action
                  est irréversible.
                </p>
                {itemName && (
                  <p className="mt-2 font-medium text-gray-900">"{itemName}"</p>
                )}
              </div>
            </div>
          </div>

          <div className="flex justify-end gap-3 p-4 bg-gray-50">
            <button
              className="px-4 py-2 text-gray-600 hover:text-gray-900 bg-white border border-gray-300 rounded"
              onClick={onClose}
            >
              Annuler
            </button>
            <button
              className="px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded"
              onClick={() => {
                onConfirm();
                onClose();
              }}
            >
              Supprimer
            </button>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
};
