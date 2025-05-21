import React, { useState } from "react";
import ButtonNav from "../../components/ButtonNav";
import { SelectDropdown } from "./LessonDashboard";
import { useDispatch, useSelector } from "react-redux";
import { LucideEye, Trash2 } from "lucide-react";
import { DeleteConfirmCard } from "./EventDasboard";
import { DeleteSchedule } from "../../sotre/slices/ScheduleSlice";
import { showNotify } from "../../sotre/slices/NotificationToast";

export default function ShedulesDashboard() {
  const [filterSection, setFilterSection] = useState("all");
  const [errorFilter, setErrorFilter] = useState("");

  const [confirmDelete, setConfirmDelete] = useState(false);
  const [scheduleToDelete, setScheduleToDelete] = useState({});

  const { schedules } = useSelector((state) => state.SchedulesData);
  const dispatch = useDispatch();

  const filteredSection = schedules.filter((schedule) => {
    const matchSection =
      filterSection === "all" ||
      schedule.filiers?.id === parseInt(filterSection);
    return matchSection;
  });

  const handleDelete = async (id) => {
    const token = localStorage.getItem("auth_token");
    const res = await fetch(
      `${import.meta.env.VITE_API_URL}/adminOnly/deleteSchedule/${id}`,
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
          title: "avertissement",
          text: data.message,
          success: false,
        })
      );
      return;
    }

    dispatch(DeleteSchedule({ id }));
    dispatch(
      showNotify({ title: "Succès", text: data.message, success: true })
    );
  };

  const handleSectionChange = (e) => {
    setFilterSection(e.target.value);
    setErrorFilter("");
  };
  return (
    <div className="flex-1 p-8 flex-grow">
      {confirmDelete && (
        <DeleteConfirmCard
          onClose={() => {
            setConfirmDelete(false);
          }}
          onConfirm={() => {
            handleDelete(scheduleToDelete.id);
          }}
          itemName={`${scheduleToDelete.filiers?.name} Emploi`}
        />
      )}
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">
          Management Schedule
        </h1>
        <ButtonNav text={"Ajouter un horaire"} to={"../add-schedule"} />
      </div>
      <div className="bg-white rounded-lg shadow p-6">
        <div className="mb-2.5  flex justify-end items-center w-70">
          <SelectDropdown
            type="filiers"
            value={filterSection.filiers_id}
            name="filiers_id"
            label="Section"
            Showerror={errorFilter}
            handleChange={handleSectionChange}
          />
        </div>
        <div className="overflow-x-auto shadow-md rounded-lg">
          <table className="min-w-full divide-y divide-gray-200 bg-white">
            <thead className="bg-edu-blue">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider">
                  Section
                </th>
                <th className="px-6 py-4 text-left text-sm font-semibold tracking-wider">
                  Date d'ajout
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredSection.map((schedule, index) => (
                <tr
                  key={schedule.id}
                  className={`${
                    index % 2 === 0 ? "bg-gray-50" : "bg-white"
                  } hover:bg-gray-100 transition-colors`}
                >
                  <td className="px-6 py-4 text-sm text-gray-800 font-medium w-3/5">
                    {schedule.filiers?.name}
                  </td>
                  <td className="px-6 py-4 text-sm text-gray-600 w-fit">
                    {new Date(schedule.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-2 py-4 flex items-center w-fit">
                    <a
                      href={`${import.meta.env.VITE_WEB_URL}/storage/${
                        schedule.schedule_pdf
                      }`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 text-sm hover:text-blue-500 rounded-sm p-1.5 hover:bg-gray-300 flex items-center gap-2"
                    >
                      <LucideEye className="h-5 w-5" />
                      <span className="hidden md:block">Voir le PDF</span>
                    </a>
                    <button
                      onClick={() => {
                        setConfirmDelete(true);
                        setScheduleToDelete(schedule);
                      }}
                      className="text-red-600 text-sm hover:text-red-500 rounded-sm p-1.5 hover:bg-gray-300 flex items-center gap-2"
                    >
                      <Trash2 className="h-5 w-5" />
                      <span className="hidden md:block">Supprimer</span>
                    </button>
                  </td>
                </tr>
              ))}

              {filteredSection.length === 0 && (
                <tr>
                  <td colSpan={3} className="text-center py-6 text-gray-500">
                    Aucun horaire trouvé.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
