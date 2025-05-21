import React from "react";
import { ArrowBigRightDash, Calendar, Clock10Icon, MapPin } from "lucide-react";
import { useSelector } from "react-redux";
import Loader from "../Loader";
import { useNavigate} from "react-router-dom";
import { TitleSection } from "../components/Apropos";

export default function EventsPage() {
  const { events, loading } = useSelector((state) => state.EventsData);

  

  return (
    <div className="min-h-screen bg-gray-50 py-4">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <TitleSection title={"Événements"} />
        <div className="text-center m-7">
          <h1 className="text-4xl font-bold text-amber-400 mb-4">
            Événements à Venir
          </h1>
          <p className="text-xl text-gray-600">
            Découvrez nos prochains événements et activités
          </p>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className="flex flex-col md:flex-row md:overflow-x-auto gap-6 md:snap-x md:snap-mandatory mt-4 pb-4 px-2">
            {events.length > 0 ? (
              events.map((event) => (
                <div
                  key={event.id}
                  className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow 
                   snap-start flex-shrink-0 md:min-w-[320px] min-w-[320px]"
                >
                  <div
                    className="h-48 bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${
                        import.meta.env.VITE_WEB_URL
                      }/storage/${event.image})`,
                    }}
                  />
                  <div className="p-6">
                    <h3 className="text-xl font-semibold text-gray-900 mb-2">
                      {event.title}
                    </h3>

                    <div className="flex items-center text-gray-600 mb-3">
                      <Calendar className="h-4 w-4 mr-2" />
                      <span>{event.date}</span>
                    </div>

                    <div className="flex items-center text-gray-600 mb-3">
                      <Clock10Icon className="h-4 w-4 mr-2" />
                      <span>{event.time.slice(0, 5)}</span>
                    </div>

                    <div className="flex items-center text-gray-600 mb-4">
                      <MapPin className="h-4 w-4 mr-2" />
                      <span>{event.location}</span>
                    </div>

                    <p className="text-gray-600 mb-4 text-sm">
                      {event.description.length > 155
                        ? `${event.description.slice(0, 105)}...`
                        : event.description}
                    </p>

                    <div className="flex items-center justify-center">
                      <ButtonVisit GOto={`/events/${event.id}`} expand={true} />
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center w-full">
                Aucun événement pour l'instant, attendez de nouveaux événements.
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
}


export function ButtonVisit({ GOto, expand }) {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(GOto)}
      style={{ width: expand && "100%" }}
      className="group hover:bg-blue-500 bg-amber-400 inline-flex items-center gap-3 text-white font-semibold px-6 py-3 rounded-full cursor-pointer transition-colors duration-300"
    >
      Voir Plus
      <span className="relative grid h-6 w-6 place-items-center rounded-full bg-white text-amber-500 overflow-hidden">
        <ArrowBigRightDash
          className="absolute -rotate-45 transition-transform duration-300 ease-in-out group-hover:translate-x-full group-hover:-translate-y-full"
          size={20}
        />
        <ArrowBigRightDash
          className="text-blue-500 -rotate-45 absolute translate-x-[-150%] translate-y-[150%] transition-transform duration-300 ease-in-out delay-100 group-hover:translate-x-0 group-hover:translate-y-0"
          size={20}
        />
      </span>
    </button>
  );
}