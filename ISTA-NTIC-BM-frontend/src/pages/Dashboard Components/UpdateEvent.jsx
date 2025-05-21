import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import GoBackBtn from "../../components/GoBackBtn";
import { useDispatch, useSelector } from "react-redux";
import { UpdateEvent, fetchEvents } from "../../sotre/slices/EventSlice";
import Loader from "../../Loader";
import { FileImage } from "lucide-react";
import { showNotify } from "../../sotre/slices/NotificationToast";

export default function UpdateEventPage() {
  const { id } = useParams(); // get the event ID from the route
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [errorsForm, setErrorsForm] = useState({});
  const { loading, events } = useSelector((state) => state.EventsData);

  const [event, setEvent] = useState({
    title: "",
    description: "",
    details: "",
    date: "",
    time: "",
    location: "",
    image: null,
  });

  useEffect(() => {
    
    const foundEvent = events.find((ev) => ev.id === parseInt(id));
    if (foundEvent) {
      setEvent({
        title: foundEvent.title,
        description: foundEvent.description,
        details: foundEvent.details,
        date: foundEvent.date,
        time: foundEvent.time,
        location: foundEvent.location,
        image: null, // Image won't be prefilled (because it's a file input)
      });
    }
  }, [id, events]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setEvent({ ...event, [name]: files ? files[0] : value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const formData = new FormData();
    formData.append("title", event.title);
    formData.append("description", event.description);
    formData.append("details", event.details);
    formData.append("date", event.date);
    formData.append("time", event.time.slice(0,5));
    formData.append("location", event.location);
  
    if (event.image) {
      formData.append("image", event.image);
    }
  
    const res = await fetch(`${import.meta.env.VITE_API_URL}/adminOnly/updateEvent/${id}`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("auth_token")}`,
      },
      body: formData,
    });
  
    const data = await res.json();
  console.log(data.errors)
    if (data.errors) {
      setErrorsForm(data.errors);
      dispatch(
        showNotify({
          title: "Avertissement",
          text: "Les valeurs que vous avez envoyées ne sont pas valides",
          success: false,
        })
      );
    } else if (data.success) {
      dispatch(UpdateEvent(data.event));
      navigate(-1);
      dispatch(
        showNotify({
          title: "Succès",
          text: "Événement mise à jour avec succès",
          success: true,
        })
      );
    }
  };
  

  // const handleSubmit = async (e) => {
  //   e.preventDefault();

  //  console.log(event);
  //   const EventData = {
  //     title: event.title,
  //     description: event.description,
  //     details: event.details,
  //     date: event.date,
  //     time: event.time.slice(0,5),
  //     location: event.location,
  //     image: event.image, 
  //   };
  //   const res = await fetch(`${import.meta.env.VITE_API_URL}/adminOnly/updateEvent/${id}`,{
  //     method:'PUT',
  //     headers:{
  //       'Authorization': `Bearer ${localStorage.getItem('auth_token')}`,
  //       'Content-Type': 'application/json', 
  //     },
  //     body:JSON.stringify(EventData)
  //   })
  //   if (!res.ok) {
  //     throw new Error(`Request failed with status ${res.status}`);
  //   }
  //   const data = await res.json()
  //   if (data.errors) {
  //     setErrorsForm(data.errors);
  //     dispatch(
  //       showNotify({
  //         title: "Avertissement",
  //         text: "Les valeurs que vous avez envoyées ne sont pas valides",
  //         success: false,
  //       })
  //     );
  //   } else if (data.success) {
  //     navigate(-1);
  //     dispatch(
  //       showNotify({
  //         title: "Succès",
  //         text: "Événement mis à jour avec succès",
  //         success: true,
  //       })
  //     );
  //   }
  // };

  function formatFileSize(bytes) {
    if (bytes < 1024) return `${bytes} B`;
    if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(2)} KB`;
    return `${(bytes / (1024 * 1024)).toFixed(2)} MB`;
  }

  return (
    <div className="min-h-fit bg-gray-50 w-full py-4 px-2 sm:py-6 sm:px-4 md:py-8 md:px-6 lg:px-8">
    <div>
      <GoBackBtn />
    </div>
  
    <div className="w-full max-w-3xl mx-auto relative">
      {loading ? (
        <Loader />
      ) : (
        <form
          encType="multipart/form-data"
          onSubmit={handleSubmit}
          className="bg-white shadow-xl rounded-b-lg sm:rounded-b-xl md:rounded-b-2xl p-4 sm:p-6 md:p-8"
        >
          <div className="mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold text-center text-blue-600">
              Modifier Event
            </h2>
            <p className="text-center text-gray-600 mt-2 text-sm sm:text-base">
              Fill in the details to update your event
            </p>
          </div>
  
          <div className="space-y-6">
            {/* Event Title */}
            <div>
              <label className="text-sm font-medium text-gray-700">Event Title</label>
              <input
                type="text"
                name="title"
                required
                onChange={handleChange}
                value={event?.title}
                className=" outline-0 mt-1 block w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base bg-gray-50 border border-gray-300 rounded-md sm:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                placeholder="Enter event title"
              />
              {errorsForm.title && (
                <p className="text-red-500 text-sm mt-2">{errorsForm.title}</p>
              )}
            </div>
  
            {/* Date and Time */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {/* Date */}
              <div>
                <label className="text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  required
                  name="date"
                  onChange={handleChange}
                  value={event?.date}
                  className=" outline-0 mt-1 block w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base bg-gray-50 border border-gray-300 rounded-md sm:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                />
                {errorsForm.date && (
                  <p className="text-red-500 text-sm mt-2">{errorsForm.date}</p>
                )}
              </div>
  
              {/* Time */}
              <div>
                <label className="text-sm font-medium text-gray-700">Time</label>
                <input
                  type="time"
                  name="time"
                  required
                  onChange={handleChange}
                  value={event?.time}
                  className=" outline-0 mt-1 block w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base bg-gray-50 border border-gray-300 rounded-md sm:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                />
                {errorsForm.time && (
                  <p className="text-red-500 text-sm mt-2">{errorsForm.time}</p>
                )}
              </div>
            </div>
  
            {/* Location */}
            <div>
              <label className="text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                name="location"
                required
                onChange={handleChange}
                value={event?.location}
                className=" outline-0 mt-1 block w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base bg-gray-50 border border-gray-300 rounded-md sm:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200"
                placeholder="Enter event location"
              />
              {errorsForm.location && (
                <p className="text-red-500 text-sm mt-2">{errorsForm.location}</p>
              )}
            </div>
  
            {/* Description */}
            <div>
              <label className="text-sm font-medium text-gray-700">Description</label>
              <textarea
                name="description"
                onChange={handleChange}
                value={event?.description}
               
                className=" outline-0 mt-1 block w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base bg-gray-50 border border-gray-300 rounded-md sm:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-none"
                placeholder="Describe your event..."
              />
              {errorsForm.description && (
                <p className="text-red-500 text-sm mt-2">{errorsForm.description}</p>
              )}
            </div>
  
            {/* Details */}
            <div>
              <label className="text-sm font-medium text-gray-700">Details</label>
              <textarea
                name="details"
                onChange={handleChange}
                value={event?.details}
                rows="4"
                className=" outline-0 mt-1 block w-full px-3 py-2 sm:px-4 sm:py-3 text-sm sm:text-base bg-gray-50 border border-gray-300 rounded-md sm:rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition duration-200 resize-none"
                placeholder="Detail your event..."
              />
              {errorsForm.details && (
                <p className="text-red-500 text-sm mt-2">{errorsForm.details}</p>
              )}
            </div>
  
            {/* Image Upload */}
            <div>
              <label className="text-sm font-medium text-gray-700">Event Images</label>
              <label
                htmlFor="imageEvent"
                className="cursor-pointer mt-1 flex justify-center px-4 sm:px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-lg hover:border-blue-500 transition duration-200"
              >
                <div className="space-y-1 text-center">
                  <FileImage size={45} className="mx-auto text-gray-400" />
                  <div className="flex flex-col sm:flex-row justify-center items-center text-sm text-gray-600 gap-1">
                  <label className="relative cursor-pointer bg-white rounded-md font-medium text-blue-600 hover:text-blue-500 focus-within:outline-none">
                      <span>
                        {event.image ? event.image.name : "Upload files"}
                      </span>
                      <input
                        id="imageEvent"
                        type="file"
                        name="image"
                        multiple
                        className="sr-only"
                        onChange={handleChange}
                      />
                    </label>
                    {!event.image && (
                      <p className="text-gray-500">or drag and drop</p>
                    )}
                  </div>
                  <p className="text-xs text-gray-500">{event.image ? (event.image.size && formatFileSize(event.image.size)) : 'PNG, JPG,... 10MB'}</p>
                  
                  {errorsForm.image && (
                    <p className="text-red-500 text-sm mt-2">
                      {errorsForm.image[0]}
                    </p>
                  )}
                </div>
              </label>
            </div>
          </div>
  
          {/* Action Buttons */}
          <div className="mt-6 sm:mt-8 flex flex-col sm:flex-row gap-3 sm:gap-4">
            <button
              type="submit"
              className="w-full sm:w-auto flex-1 bg-blue-600 text-white py-3 px-6 rounded-lg text-sm font-semibold hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition duration-200"
            >
              Update Event
            </button>
          </div>
        </form>
      )}
    </div>
  </div>
  
  );
}
