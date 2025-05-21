import { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { ButtonVisit } from '../pages/EventsPage';

function ArrowBtn({ onClick, direction }) {
  return (
    <button
      onClick={onClick}
      className={`group absolute ${direction === 'right' ? 'right-4' : 'left-4'} top-1/2 -translate-y-1/2 bg-yellow-100 hover:bg-yellow-400 border-2 border-amber-300 rounded-full px-2 py-4 backdrop-blur-sm transition-all`}
    >
      {direction === 'right' ? (
        <ChevronRight className="h-6 w-6 text-yellow-400 group-hover:text-white" />
      ) : (
        <ChevronLeft className="h-6 w-6 text-yellow-400 group-hover:text-white" />
      )}
    </button>
  );
}

export default function EventCarousel({ events }) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    startAutoSlide();
    return () => stopAutoSlide();
  }, [currentIndex]);

  const startAutoSlide = () => {
    stopAutoSlide();
    intervalRef.current = setInterval(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === events.length - 1 ? 0 : prevIndex + 1
      );
    }, 5000);
  };

  const stopAutoSlide = () => {
    if (intervalRef.current) clearInterval(intervalRef.current);
  };

  const nextSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === events.length - 1 ? 0 : prevIndex + 1
    );
    startAutoSlide();
  };

  const prevSlide = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? events.length - 1 : prevIndex - 1
    );
    startAutoSlide();
  };

  function handleEventImage(image) {
    return image
      ? `${import.meta.env.VITE_WEB_URL}/storage/${image}`
      : './back-up/ista-ntic-bm.jpg' || './back-up/default-event.jpg';
  }

  return (
    <div className="relative w-full h-[85svh] overflow-hidden rounded-xl">
      <div
        className="absolute inset-0 flex transition-transform duration-500 ease-in-out"
        style={{ transform: `translateX(-${currentIndex * 100}%)` }}
      >
        {events.map((event) => (
          <div
            key={event.id}
            className="relative w-full h-full flex-shrink-0 bg-gradient-to-b from-black/95 via-transparent to-transparent"
            style={{
              backgroundImage: `url(${handleEventImage(event.image)})`,
              backgroundSize: 'cover',
              backgroundPosition: 'center',
            }}
          >
            {/* Dark Overlay */}
            <div className="absolute inset-0 bg-black opacity-50"></div> {/* Added dark overlay */}
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white p-8 bg-gradient-to-t from-black/95 via-transparent to-transparent ">
              <h2 className="text-amber-500 text-2xl md:text-[5rem] font-bold mb-4 text-center">
                {event.title}
              </h2>
              <p className="text-amber-300 text-xl md:text-4xl mb-2 font-bold">
                {event.formated_date}
              </p>
              <p className="text-amber-200 text-xl mt-4">{event.location}</p>
              <ButtonVisit GOto={`/events/${event.id}`} />
            </div>
          </div>
        ))}
      </div>

      <ArrowBtn onClick={prevSlide} direction={'left'} />
      <ArrowBtn onClick={nextSlide} direction={'right'} />

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {events.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === currentIndex ? 'bg-white w-4' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
