import React, { useEffect, useState } from "react";
import { Calendar, MapPin, Clock, ArrowLeft, Share2, Text, CalendarX } from "lucide-react";
import { useParams } from "react-router-dom";
import { ButtonVisit } from "./EventsPage";
import Loader from "../Loader";
import GoBackBtn from "../components/GoBackBtn";

const EventDetails = () => {
  const [event, setevent] = useState({});
  const [loading, setLoading] = useState(false)
  const {id} = useParams();
  useEffect(() => {
    setLoading(true)
    const fetcheventByID = async () => {
        const res = await fetch(`${import.meta.env.VITE_API_URL}/getevents/${id}`);
      if (!res.ok) {
        setevent(null);
      }
      const {event} = await res.json();
      
      setevent(event);
      setLoading(false)
    };
    console.log(loading);
    fetcheventByID();
    console.log(loading);
  }, [id]);

  if(loading){
    return(
        <div className="h-screen">
            <Loader />
        </div>
    )
  }

  return (
    <div>
      {event ? (
        <div className="min-h-screen bg-gray-50">

        <div className="relative h-[50vh] sm:h-[60vh] md:h-96">
          <img
            src={`${import.meta.env.VITE_WEB_URL}/storage/${event.image}`}
            alt={event.title}
            className="w-full h-full object-cover object-center sm:object-top"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
          <div className="absolute w-fit top-4 left-4">
            <GoBackBtn />
          </div>
        </div>
      
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 -mt-32 relative z-10">
          <div className="bg-white rounded-xl shadow-xl p-6 sm:p-8">
           
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{event.title}</h1>
              <div className="flex flex-wrap gap-6 text-gray-600">
                <div className="flex items-center">
                  <Calendar className="w-5 h-5 mr-2 text-blue-600" />
                  <span>{event.date}</span>
                </div>
                <div className="flex items-center">
                  <MapPin className="w-5 h-5 mr-2 text-blue-600" />
                  <span>{event.location}</span>
                </div>
                <div className="flex items-center">
                  <Clock className="w-5 h-5 mr-2 text-blue-600" />
                  <span>{event.time}</span>
                </div>
              </div>
            </div>
      
            {/* Description */}
            <div className="prose max-w-none mb-8">
              <p className="text-gray-600 text-lg mb-4">{event.description}</p>
            </div>
      
            {/* Image & Details Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
              <div className="rounded-xl overflow-hidden">
                <img
                  src={`${import.meta.env.VITE_WEB_URL}/storage/${event.image}`}
                  alt={event.title}
                  className="w-full h-64 sm:h-72 md:h-full object-cover object-center sm:object-top"
                />
              </div>
              <div>
                <div className="text-orange-500 text-sm font-medium mb-2">
                  <Text size={25} className="inline mr-2" />
                  Détails de l'événement
                </div>
               
               <p className="text-gray-800 font-medium mb-6 wrap-break-word">{event.details}</p>
               
              </div>
            </div>
      
            {/* Share Section */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between items-center bg-gray-50 rounded-lg p-6">
              <div>
                <h3 className="font-semibold text-gray-900 mb-1">Partagez cet événement</h3>
                <p className="text-sm text-gray-600">Invitez vos amis.</p>
              </div>
              <ShareBtn eventTOShare={event} />
            </div>
          </div>
        </div>
      </div>
      
      ) : (
        <EventNotFound />
      )}
    </div>
  );
};

export default EventDetails;

function ShareBtn({ eventTOShare }) {
  const handleShare = () => {
    if (navigator.share) {
      alert("click inside testts");
      navigator
        .share({
          title: eventTOShare.title,
          text: `📢 ${eventTOShare.title}\n📅 ${
            eventTOShare.date
          }\n⏰ ${eventTOShare.time.slice(0, 5)}\n📍 ${
            eventTOShare.location
          }\n\nDécouvrir l'événement ici: ${window.location.origin}/${
            eventTOShare.id
          }`,
        })
        .then(() => console.log("Shared successfully"))
        .catch((error) => console.log("Error sharing:", error));
    } else {
      // if 7alat kan Api dial Sharing makhdamch
      window.open(
        `https://wa.me/?text=${encodeURIComponent(
          `📢 ${eventTOShare.title}\n📅 ${
            eventTOShare.date
          }\n⏰ ${eventTOShare.time.slice(0, 5)}\n📍 ${
            eventTOShare.location
          }\n\nDécouvrir l'événement ici: ${window.location.origin}/${
            eventTOShare.id
          }`
        )}`,
        "_blank"
      );
    }
  };
  return (
    <button
      onClick={handleShare}
      className="group flex items-center px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
    >
      <Share2 className="w-5 h-5 mr-2 group-hover:-rotate-[360deg] duration-500" />
      Partager
    </button>
  );
}



export function EventNotFound() {
  return (
    <div className="h-screen mx-auto grid place-items-center text-center px-8">
      <div>
        <CalendarX className="w-20 h-20 mx-auto text-red-500" />
        <h1 className="mt-10 text-3xl md:text-4xl font-bold leading-snug text-gray-800">
          Événement introuvable
        </h1>
        <p className="mt-8 mb-14 text-[18px] font-normal text-gray-500 mx-auto md:max-w-sm">
          L'événement que vous recherchez n'existe pas ou a été supprimé.
          Veuillez vérifier l'URL ou revenir à la page d’accueil.
        </p>
        <ButtonVisit GOto={-1} />
      </div>
    </div>
  );
}
