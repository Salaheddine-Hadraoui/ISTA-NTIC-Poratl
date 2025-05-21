import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import GoBackBtn from "../../components/GoBackBtn";
import { LucideFileUp, Loader2 } from "lucide-react";
import { showNotify } from "../../sotre/slices/NotificationToast";
import { SelectDropdown } from "./LessonDashboard";
import { formatFileSize } from "./AddEvent";
import { fetchSchedules } from "../../sotre/slices/ScheduleSlice";


export default function AddScheduleForm() {
  const [schedule, setSchedule] = useState({
    filiers_id: "",
    schedule_pdf: null,
  });
  const [errorsForm, setErrorsForm] = useState({});
  const [loading, setLoading] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setSchedule({ ...schedule, [name]: files ? files[0] : value });
  };

  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const droppedFile = e.dataTransfer.files[0];
    if (droppedFile) {
      setSchedule((prev) => ({
        ...prev,
        schedule_pdf: droppedFile,
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = new FormData();
    formData.append("filiers_id", schedule.filiers_id);
    formData.append("schedule_pdf", schedule.schedule_pdf);

    const res = await dispatch(
      fetchSchedules({
        urlApi: "adminOnly/addNewSchedule",
        scheduleInfo : formData,
        methodHTTP: "POST",
        isFormData: true,
      })
    );

    setLoading(false);

    if (res.payload.data.errors) {
      setErrorsForm(res.payload.data.errors);
      dispatch(
        showNotify({
          title: "Erreur",
          text: "Les données envoyées sont invalides.",
          success: false,
        })
      );
    } else if (res.payload.data.success) {
      setSchedule({ filiers_id: "", schedule_pdf: null });
      navigate(-1);
      dispatch(
        showNotify({
          title: "Succès",
          text: "Emploi du temps ajouté avec succès.",
          success: true,
        })
      );
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded-2xl shadow-lg">
      <GoBackBtn />
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
        📅 Ajouter un Emploi du Temps
      </h1>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Select Filière */}
        <div>
          <SelectDropdown
            type="filiers"
            value={schedule.id}
            name="filiers_id"
            label="Filière"
            Showerror={errorsForm.filiers_id}
            handleChange={handleChange}
          />
        </div>

        {/* File Upload */}
        <div
          className="w-full border-2 border-dashed rounded-xl text-center p-6 cursor-pointer hover:border-blue-400 transition-all"
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <label htmlFor="schedule_pdf" className="cursor-pointer block">
            <LucideFileUp className="w-10 h-10 text-blue-600 mx-auto" />
            <p className="text-gray-600 mt-2">
              {schedule.schedule_pdf
                ? schedule.schedule_pdf.name
                : "Glissez un fichier PDF ici ou cliquez pour en choisir un."}
            </p>
            {schedule.schedule_pdf && (
              <p className="text-xs text-gray-500">
                {formatFileSize(schedule.schedule_pdf.size)}
              </p>
            )}
            {errorsForm.schedule_pdf && (
              <p className="text-red-500 text-sm mt-2">
                {errorsForm.schedule_pdf[0]}
              </p>
            )}
          </label>
          <input
            id="schedule_pdf"
            name="schedule_pdf"
            type="file"
            accept=".pdf"
            className="hidden"
            onChange={handleChange}
          />
        </div>

        {/* Action Buttons */}
        <div className="flex justify-end gap-3">
          <button
            type="submit"
            disabled={loading}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md flex items-center gap-2"
          >
            {loading && <Loader2 className="w-4 h-4 animate-spin" />}
            Ajouter
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 px-6 py-2 rounded-md"
          >
            Annuler
          </button>
        </div>
      </form>
    </div>
  );
}
