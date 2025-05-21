import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ContactInfo, MapFrame } from "../pages/Contact";
import { useLocation } from "react-router-dom";
import { CheckCheck } from "lucide-react";

export default function Apropos() {
  const [filieres, setFilieres] = useState([])
  const location = useLocation();
  useEffect(()=>{
    async function fetchFiliers (){
      const res = await fetch(`${import.meta.env.VITE_API_URL}/getFilieres`)
      if(!res.ok){
        return setFilieres([]) ;
      }
      const data = await res.json();
      setFilieres(data.filiers || [])
    }
    fetchFiliers()
  },[])
  

  const AnimatedText = ({ text, className = "", delay = 0 }) => (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {text}
    </motion.div>
  );

  const AnimatedImage = ({ src, alt, className = "", delay = 0 }) => (
    <motion.img
      src={src}
      alt={alt}
      initial={{ opacity: 0, scale: 0.95 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      viewport={{ once: false }}
      className={className}
    />
  );

  const AnimatedSection = ({ children, className = "", delay = 0 }) => (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay, ease: "easeOut" }}
      viewport={{ once: false, margin: "-100px" }}
      className={className}
    >
      {children}
    </motion.div>
  );

  return (
    <section className="bg-white text-gray-800 py-10 px-6 lg:px-20">
      {location.pathname === "/About-us" && (
        <TitleSection title={'À propos de nous'} />
      )}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        viewport={{ once: false }}
      >
        <p className="text-yellow-300 text-md underline font-medium px-0 py-2.5">
          A propos de
        </p>
      </motion.div>

      <div className="pl-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4 pb-8">
          <AnimatedSection
            className="md:order-2 grid grid-cols-1 gap-4 mt-4"
            delay={0.2}
          >
            <AnimatedImage
              src="back-up/ista-ntic-bm.jpg"
              alt="ISTA Hall"
              className="rounded-xl shadow-lg"
              delay={0.3}
            />
            <AnimatedImage
              src="back-up/ista-ntic-bm.jpg"
              alt="Bâtiment ISTA"
              className="rounded-xl shadow-lg hidden md:block"
              delay={0.5}
            />
          </AnimatedSection>

          <AnimatedSection delay={0.1}>
            <AnimatedText
              text="ISTA NTIC Beni Mellal"
              className="text-3xl font-bold mb-4"
              delay={0.2}
            />
            <AnimatedText
              text="Fondé en 2008, l'Institut Spécialisé de Technologie Appliquée des
              Nouvelles Technologies de l'Information et de la Communication
              (ISTA NTIC) de Beni Mellal est un établissement public relevant de
              l'OFPPT. Il forme des techniciens spécialisés dans les domaines du
              développement digital et de l'infrastructure digitale."
              className="mb-6 text-gray-500"
              delay={0.3}
            />

            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              viewport={{ once: false }}
              className="text-2xl font-semibold mb-2"
            >
              Filières proposées
            </motion.h2>

            <ul className="list-inside mb-6 text-gray-500 pl-8">
              {filieres.map((item, index) => (
                <motion.li
                className="flex items-center gap-2"
                  key={index}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.5 + index * 0.1,
                    ease: "easeOut",
                  }}
                  viewport={{ once: false }}
                >
                  <span>
                    <CheckCheck className="text-blue-600" />
                  </span>
                  {item.name}
                </motion.li>
              ))}
            </ul>

            <motion.h2
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              viewport={{ once: false }}
              className="text-2xl font-semibold mb-2"
            >
              Durée des études
            </motion.h2>

            <AnimatedText
              text="La formation dure généralement deux ans, combinant enseignement
              théorique et stages pratiques en entreprise."
              className="mb-6 text-gray-500"
              delay={0.9}
            />
          </AnimatedSection>
        </div>

        <motion.h2
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: false }}
          className="text-[3.2rem] font-semibold mb-2 text-center py-4"
        >
          Contact
        </motion.h2>

        <AnimatedSection
          delay={0.3}
          className={`${
            location.pathname === "/About-us" &&
            "flex flex-col md:flex-row items-stretch justify-between gap-3"
          }`}
        >
          <ContactInfo />
          {location.pathname === "/About-us" && <MapFrame />}
        </AnimatedSection>
      </div>
    </section>
  );
}


export const TitleSection =({title})=>{
  return (
    <div
          className="relative overflow-hidden rounded-lg text-center h-35 md:h-70 p-4 bg-cover bg-no-repeat flex items-center justify-center"
          style={{
            backgroundImage: 'url("back-up/ista-ntic-bm.jpg")',
            backgroundPositionY: "30%",
          }}
        >
          <div className="absolute inset-0 bg-black/60" ></div>
          <motion.h1 
           initial={{ opacity: 0, y: -42 }}
           whileInView={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.5, delay: 0.7 }}
           viewport={{ once: false }}
          className="relative prompt-bold  z-10 text-3xl md:text-[4.5rem] text-yellow-400">
            {title}
          </motion.h1>
        </div>
  )
}
