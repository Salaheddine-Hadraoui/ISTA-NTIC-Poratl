import { useState } from "react";
import {
  FileText,
  Search,
  Filter,
} from "lucide-react";
import { useSelector } from "react-redux";
import Loader from "../Loader";
import { DownloadBtn, GetAccesCardToast, handleDownloading } from "./LessonsPage";

export default function SchedulePage() {
  const {user} = useSelector((state)=>state.authUser)
  const { schedules, loading } = useSelector((state) => state.SchedulesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilier, setSelectedFilier] = useState("all");

 
  const filiers = ["all", ...new Set(schedules.map(s => s.filiers?.name))];

  const filteredSchedules = schedules.filter(sch => {
    const matchSearch = sch.filiers?.name
      .toLowerCase()
      .includes(searchTerm.toLowerCase());
    const matchFilier = selectedFilier === "all" || sch.filiers?.name === selectedFilier;
    return matchSearch && matchFilier;
  });

  return (
    <div className="min-h-screen bg-gray-50 py-8">
       {!user && <GetAccesCardToast />}
      <div className="max-w-6xl mx-auto px-4">
        <h1 className="text-3xl font-bold text-blue-900 mb-8">Planning</h1>

        <div className="bg-white rounded-xl shadow-md p-6 mb-8">
          <div className="grid gap-6 md:grid-cols-3">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <input
                type="text"
                placeholder="Rechercher une filière..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="outline-0 pl-10 w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              />
            </div>

            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <select
                value={selectedFilier}
                onChange={(e) => setSelectedFilier(e.target.value)}
                className="outline-0 pl-10 w-full rounded-lg border-gray-300 focus:border-blue-500 focus:ring-blue-500"
              >
                {filiers.map((f) => (
                  <option key={f} value={f}>
                    {f === "all" ? "Toutes les filières" : f}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {loading ? (
      <div className="h-[20vh] relative">
            <Loader />
            </div>
        ) : (
          <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
            {filteredSchedules.map((schedule) => (
              <div
                key={schedule.id}
                className="bg-indigo-800 rounded-xl pt-[40px] rounded-t-3xl shadow-md hover:shadow-lg transition-shadow px-0.5"
              >
                <div className="p-5 rounded-t-2xl bg-white">
                
                <div className="flex items-center mb-3">
                  <FileText className="h-6 w-6 text-blue-700 mr-2" />
                  <h3 className="text-lg font-semibold text-gray-900">
                    {schedule.filiers?.name}
                  </h3>
                </div>
                <p className="text-gray-600 text-sm mb-4">
                  {schedule.filiers?.description}
                </p>
                <div className="flex items-center justify-end">
                  
                <DownloadBtn
                          text={'Voir Emploi'} 
                          onClick={()=>{handleDownloading(schedule.schedule_pdf)}} />
                </div>
              </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
