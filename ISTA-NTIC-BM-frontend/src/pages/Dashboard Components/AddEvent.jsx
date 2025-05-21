import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import GoBackBtn from "../../components/GoBackBtn";
import { useDispatch, useSelector } from "react-redux";
import { fetchEvents } from "../../sotre/slices/EventSlice";

import { FileImage } from "lucide-react";
import { showNotify } from "../../sotre/slices/NotificationToast";

export function formatFileSize(bytes) {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} Ko`;
  return `${(bytes / (1024 * 1024)).toFixed(2)} Mo`;
}
export default function AddEventPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorsForm, setErrorsForm] = useState({});
  const [event, setEvent] = useState({
    title: "",
    description: "",
    details: "",
    date: "",
    time: "",
    location: "",
    image: null,
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setEvent({ ...event, [name]: files ? files[0] : value });
  };

const [currentDay, setCurrentDay] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("title", event.title);
    formData.append("description", event.description);
    formData.append("details", event.details);
    formData.append("date", event.date);
    formData.append("time", event.time);
    formData.append("location", event.location);
    formData.append("image", event.image);

    const res = await dispatch(
      fetchEvents({
        urlApi: "adminOnly/addnewEvent",
        eventInfo: formData,
        methodHTTP: "POST",
        isFormData: true,
      })
    );
    console.log(res);
    if (res.payload.data.errors) {
      setErrorsForm(res.payload.data.errors);
      dispatch(
        showNotify({
          title: "Avertissement",
          text: "Les valeurs que vous avez envoyées ne sont pas valides",
          success: false,
        })
      );
    } else if (res.payload.data.success) {
      setEvent({
        title: "",
        description: "",
        details: "",
        date: "",
        time: "",
        location: "",
        image: null,
      });
      navigate(-1);
      dispatch(
        showNotify({
          title: "Succès",
          text: "Événement ajouté avec succès",
          success: true,
        })
      );
    }
  };
useEffect(()=>{
  const today = new Date().toISOString().split('T')[0]; setCurrentDay(today)
})

  return (
    <div className="min-h-fit bg-gray-50 w-full py-2 px-1 sm:py-3 sm:px-2 md:py-4 md:px-4 lg:px-6">
      <div>
        <GoBackBtn />
      </div>

      <div className="w-full max-w-2xl mx-auto relative">
        <form
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          className="bg-white shadow-lg rounded-lg p-3 sm:p-4"
        >
          <div className="mb-4">
            <h2 className="text-xl sm:text-2xl font-bold text-center text-blue-600">
              Créer un événement
            </h2>
            <p className="text-center text-gray-600 mt-1 text-xs sm:text-sm">
              Entrez les détails de l'événement ci-dessous
            </p>
          </div>

          <div className="space-y-4">
            {/* Titre */}
            <div>
              <label className="text-xs font-medium text-gray-700">
                Titre de l'événement
              </label>
              <input
                type="text"
                name="title"
                required
                onChange={handleChange}
                value={event.title}
                className="mt-1 block w-full px-2 py-1 text-xs bg-gray-50 border border-gray-300 outline-0 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Titre"
              />
              {errorsForm.title && (
                <p className="text-red-500 text-xs mt-1">{errorsForm.title}</p>
              )}
            </div>

            {/* Date et Heure */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              <div>
                <label className="text-xs font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  name="date"
                  required
                  onChange={handleChange}
                  value={event.date}
                  className="mt-1 block w-full px-2 py-1 text-xs bg-gray-50 border border-gray-300 outline-0 focus:ring-2 focus:ring-blue-500"
                />
                {errorsForm.date && (
                  <p className="text-red-500 text-xs mt-1">{errorsForm.date}</p>
                )}
              </div>
              <div>
                <label className="text-xs font-medium text-gray-700">Heure</label>
                <input
                  type="time"
                  name="time"
                  required
                  onChange={handleChange}
                  value={event.time}
                  className="mt-1 block w-full px-2 py-1 text-xs bg-gray-50 border border-gray-300 outline-0 focus:ring-2 focus:ring-blue-500"
                />
                {errorsForm.time && (
                  <p className="text-red-500 text-xs mt-1">{errorsForm.time}</p>
                )}
              </div>
            </div>

            {/* Lieu */}
            <div>
              <label className="text-xs font-medium text-gray-700">Lieu</label>
              <input
                type="text"
                name="location"
                required
                onChange={handleChange}
                value={event.location}
                className="mt-1 block w-full px-2 py-1 text-xs bg-gray-50 border border-gray-300 outline-0 focus:ring-2 focus:ring-blue-500"
                placeholder="Lieu"
              />
              {errorsForm.location && (
                <p className="text-red-500 text-xs mt-1">{errorsForm.location}</p>
              )}
            </div>

            {/* Description */}
            <div>
              <label className="text-xs font-medium text-gray-700">
                Description
              </label>
              <textarea
                name="description"
                onChange={handleChange}
                value={event.description}
                className="mt-1 block w-full px-2 py-1 text-xs bg-gray-50 border border-gray-300 outline-0 focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Description de l'événement"
              />
              {errorsForm.description && (
                <p className="text-red-500 text-xs mt-1">{errorsForm.description}</p>
              )}
            </div>

            {/* Détails */}
            <div>
              <label className="text-xs font-medium text-gray-700">Détails</label>
              <textarea
                name="details"
                onChange={handleChange}
                value={event.details}
                rows="3"
                className="mt-1 block w-full px-2 py-1 text-xs bg-gray-50 border border-gray-300 outline-0 focus:ring-2 focus:ring-blue-500 resize-none"
                placeholder="Détails de l'événement"
              />
              {errorsForm.details && (
                <p className="text-red-500 text-xs mt-1">{errorsForm.details}</p>
              )}
            </div>

            {/* Téléchargement d'image */}
            <div>
              <label className="text-xs font-medium text-gray-700">Image</label>
              <label
                htmlFor="imageEvent"
                className="cursor-pointer mt-1 flex justify-center items-center px-3 pt-3 pb-4 border-2 border-dashed border-gray-300 rounded hover:border-blue-500 transition"
              >
                <div className="text-center text-xs text-gray-600 space-y-1">
                  <FileImage size={30} className="mx-auto text-gray-400" />
                  <span className="block">
                    {event.image ? event.image.name : "Téléchargez ou glissez l'image"}
                  </span>
                  {event.image && (
                    <p className="text-gray-500 text-[10px]">
                      {formatFileSize(event.image.size)}
                    </p>
                  )}
                  {!event.image && (
                    <p className="text-gray-400 text-[10px]">PNG, JPG, 10 Mo max</p>
                  )}
                  {errorsForm.image && (
                    <p className="text-red-500 text-xs mt-1">
                      {errorsForm.image[0]}
                    </p>
                  )}
                  <input
                    id="imageEvent"
                    type="file"
                    name="image"
                    className="sr-only"
                    multiple
                    onChange={handleChange}
                  />
                </div>
              </label>
            </div>
          </div>

          {/* Boutons */}
          <div className="mt-4">
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 text-sm font-semibold outline-0 hover:bg-blue-700 transition"
            >
              Créer
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
