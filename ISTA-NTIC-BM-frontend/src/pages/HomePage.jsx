import { ExternalLink } from "lucide-react";
import Apropos from "../components/Apropos";
import EventCarousel from "../components/EventCarousel";
import Features from "../components/Features";
import { useSelector } from "react-redux";
import { motion } from 'framer-motion';

export default function HomePage() {
  const { events } = useSelector((state) => state.EventsData);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <section className="mb-12">
          <EventCarousel events={events} />
        </section>
        <div>
          <Apropos />
        </div>
        <div>
          <Features />
        </div>

        
        <motion.div 
         initial={{ opacity: 0, y: 30 }}
         whileInView={{ opacity: 1, y: 0 }}
         transition={{ duration: 0.7, delay:0.5, ease: "easeOut" }}
         viewport={{ once: false, margin: "-100px" }}
        className="max-w-3xl mx-auto text-center relative">
          <div className="absolute inset-0 bg-[#001845] overflow-hidden rounded-xl">
            <div className="absolute w-full h-full bg-[url('https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg')] bg-cover bg-center opacity-5"></div>
            <div className="absolute inset-0 bg-gradient-to-br from-[#001845] via-[#002157] to-[#003380]"></div>
          </div>
          <div className="bg-gradient-to-r from-blue-500/20 to-blue-400/20 rounded-2xl p-8 backdrop-blur-lg border border-white/10">
            <h2 className="text-2xl font-bold text-white mb-4">
              Prêt à Commencer Votre Formation ?
            </h2>
            <p className="text-blue-100 mb-8">
              Les inscriptions pour l'année académique 2025-2026 sont ouvertes.
              Ne manquez pas cette opportunité de formation professionnelle.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="https://www.myway.ac.ma/fr/register"
                target="_blank"
                rel="noopener noreferrer"
                className="group bg-white text-[#001845] px-8 py-4 rounded-xl font-bold hover:bg-blue-50 transition-all flex items-center justify-center shadow-lg shadow-blue-500/20 hover:shadow-blue-500/30"
              >
                Commencer l'Inscription
                <ExternalLink
                  size={18}
                  className="ml-2 group-hover:translate-x-1 transition-transform"
                />
              </a>
              <a
                href="https://www.myway.ac.ma/fr/login"
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-200 hover:text-white transition-colors underline underline-offset-4"
              >
                Déjà inscrit ? Connectez-vous
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
