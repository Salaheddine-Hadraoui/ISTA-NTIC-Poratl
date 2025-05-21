import { useState, useEffect, useRef } from "react";
import {
  Search,
  Book,
  Filter,
  X,
  ArrowRight,
  Grid2x2CheckIcon,
} from "lucide-react";
import { motion } from "framer-motion";

import { useSelector } from "react-redux";
import { PdfViewer } from "pdfjskit";
import Loader from "../Loader";
import { useNavigate } from "react-router-dom";

export const handleDownloading = (fileName) => {
  const url = `${import.meta.env.VITE_WEB_URL}/storage/${fileName}`;

  window.open(url, "_blank");
};

export default function LessonsPage() {
  const { courses, loading } = useSelector((state) => state.CoursesData);

  const [isLoggedIn, setIsLoggedIn] = useState("logged");

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedModule, setSelectedModule] = useState("all");
  const [selectedPdf, setSelectedPdf] = useState(null);

  const modules = [
    "all",
    ...new Set(courses.map((course) => course.module?.name)),
  ];
  const pdfViewerRef = useRef(null);

  const filteredCourses = courses.filter((course) => {
    const matchesSearch = course.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchesModule =
      selectedModule === "all" || course.module?.name === selectedModule;
    return matchesSearch && matchesModule;
  });

  const handleViewPdf = (coursePdf) => {
    const token = localStorage.getItem("auth_token");
    if (!token) {
      setIsLoggedIn("not");
      return;
    }
    setSelectedPdf(coursePdf);
  };

  useEffect(() => {
    if (selectedPdf && pdfViewerRef.current) {
      if (pdfViewerRef.current.pdfViewerInstance) {
        pdfViewerRef.current.pdfViewerInstance.destroy();
      }

      const pdfViewer = new PdfViewer({
        documentUrl: `${import.meta.env.VITE_API_URL}/course-pdf/${
          selectedPdf.split("/")[1]
        }`,
        width: "100%",
        height: "85%",
        theme: "slate, classic-dark",
        permissions: {
          downloadOriginal: false,
          save: false,
          print: false,
        },
        verticalToolbarVisible: false,
      });

      pdfViewerRef.current.pdfViewerInstance = pdfViewer;

      pdfViewer.render(pdfViewerRef.current);
    }
  }, [selectedPdf]);

  useEffect(() => {
    const time = setTimeout(() => {
      setIsLoggedIn("logged");
    }, 7000);
    return () => clearTimeout(time);
  }, [isLoggedIn]);

  const handleCloseModal = () => {
    setSelectedPdf(null);
  };

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      {isLoggedIn === "not" && <GetAccesCardToast />}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-3xl font-bold text-blue-900 mb-8">
          Matériels de Cours
        </h1>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Rechercher des cours..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="outline-0 pl-10 w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={selectedModule}
                onChange={(e) => setSelectedModule(e.target.value)}
                className="outline-0 pl-10 w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              >
                {modules.map((module) => (
                  <option key={module} value={module}>
                    {module === "all" ? "Tous les modules" : module}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="relative grid gap-6 md:grid-cols-2">
          {loading ? (
            <Loader />
          ) : (
            filteredCourses.map((course) => (
              <div
                key={course.id}
                className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center">
                      <Book className="h-6 w-6 text-blue-700 mr-2" />
                      <h3 className="text-xl font-semibold text-gray-900">
                        {course.name}
                      </h3>
                    </div>
                  </div>

                  <div className="mb-4">
                    <p className="text-gray-600">
                      <span className="font-medium">Module :</span>{" "}
                      {course.module?.name || "Inconnu"}
                    </p>
                  </div>

                  <div className="border-t pt-4">
                    <h4 className="font-medium text-gray-900 mb-2">
                      Document :
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center justify-between bg-gray-50 p-2 rounded-lg">
                        <button
                          onClick={() => handleViewPdf(course.course_pdf)}
                          className="cursor-pointer text-blue-700 hover:text-blue-800"
                        >
                          <span>Voir le PDF</span>
                        </button>
                        <DownloadBtn
                          text={"Telechrger"}
                          onClick={() => {
                            handleDownloading(course.course_pdf);
                          }}
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      </div>

      {selectedPdf && (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-4 relative max-w-5xl w-full h-[90%] overflow-auto">
            <button
              onClick={handleCloseModal}
              className="absolute top-4 right-4 bg-white/40 rounded text-slate-700 hover:text-red-600 hover:bg-white z-80"
            >
              <X className="h-6 w-6" />
            </button>

            <div className="w-full h-full" ref={pdfViewerRef}></div>
          </div>
        </div>
      )}
    </div>
  );
}

export const GetAccesCardToast = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="fixed bottom-6 right-6 z-50"
      initial={{ opacity: 0, y: 100 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 100 }}
      transition={{ duration: 0.5, type: "spring" }}
    >
      <div className="relative overflow-hidden max-w-xs border border-slate-200 rounded-2xl shadow-lg shadow-indigo-200 bg-white p-4">
        <span className="absolute -bottom-7 -right-8.5 px-11 blur-xl py-11 bg-purple-700 rounded-full" />

        <div className="flex items-center gap-4">
          <span className="flex-shrink-0 flex items-center justify-center rounded-full bg-indigo-900 p-2 text-white">
            <Grid2x2CheckIcon />
          </span>
          <p className="font-bold text-slate-950">Accès Restreint</p>
        </div>

        <p className="font-semibold text-indigo-600 text-sm pl-12">
          Vous devez être{" "}
          <span className="border-b-2 border-dashed">
            connecté pour accéder à ce contenu.
          </span>{" "}
          Si vous n'avez pas de compte, vous pouvez en créer un sur la page de
          connexion. Merci de votre compréhension.
        </p>

        <div className="mt-6">
          <motion.button
            className="group flex items-center mx-auto cursor-pointer relative bg-white border-2 hover:text-indigo-800 hover:border-indigo-800 text-black font-semibold text-sm px-6 py-3 rounded-full transition-all duration-200 ease-in-out shadow hover:shadow-lg w-40 h-12"
            onClick={() => navigate("/entrer/join-us")}
            initial={{ x: 0 }}
            animate={{
              x: [0, -30, 30, -30, 30, 0],
              transition: {
                duration: 1.5,
                ease: "easeInOut",
              },
            }}
          >
            <div className="relative flex items-center justify-center gap-2">
              <span className="relative inline-block overflow-hidden">
                <span className="text-indigo-600 block transition-transform duration-300 group-hover:-translate-y-full">
                  Se connecter
                </span>
                <span className="absolute inset-0 transition-transform duration-300 translate-y-full group-hover:translate-y-0">
                  Accédez maintenant
                </span>
              </span>

              <ArrowRight
                size={15}
                className="bg-black group-hover:bg-indigo-700 text-white rounded-2xl transition-transform duration-200 group-hover:-rotate-45"
              />
            </div>
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
};

export const DownloadBtn = ({ text, onClick }) => {
  return (
    <button
      disabled={!localStorage.getItem("auth_token")}
      className="bg-white w-36 h-11 flex items-center justify-center gap-5 border border-gray-300 text-sm cursor-pointer transition-all duration-300 rounded-lg hover:shadow-md group"
      onClick={onClick}
    >
      <span className="w-[15px] h-auto flex items-end justify-center relative">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 71 67"
          className="w-full"
        >
          <path
            strokeWidth={5}
            stroke="black"
            d="M41.7322 11.7678L42.4645 12.5H43.5H68.5V64.5H2.5V2.5H32.4645L41.7322 11.7678Z"
          />
        </svg>
        <span className="absolute w-full bottom-0 h-[70%] border-2 border-black border-b border-b-black bg-white skew-x-[-40deg] origin-bottom-right transition-all duration-500 group-hover:h-[50%] group-hover:skew-x-[-55deg]" />
      </span>
      {text}
    </button>
  );
};
