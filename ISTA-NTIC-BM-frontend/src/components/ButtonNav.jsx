import { Plus } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function ButtonNav({text,to}) {
  const navigate =  useNavigate()
  return (
    <button onClick={() => navigate(to)} className="border-2 border-[#24b4fb] bg-[#24b4fb] rounded-sm md:rounded-[0.9em] p-1.5 md:px-4 md:p-3 hover:bg-[#0071e2] transition-all duration-200 ease-in-out text-sm md:text-[16px]">
      <span className="flex items-center justify-center text-white font-semibold">
        <Plus className="w-5 h-5 md:w-6 md:h-6" />
        {text}
      </span>
    </button>
  );
}
