import React from 'react';
import { ArrowBigLeft } from "lucide-react";
import { useNavigate } from 'react-router-dom'

export default function GoBackBtn() {
    const navigate = useNavigate();
  return (
    <button
    onClick={()=>navigate(-1)}
      type="button"
      className="bg-white text-center w-16 md:w-48 rounded-2xl h-14 relative text-black text-lg font-semibold border-4 border-white group"
    >
      <div
        className="bg-gray-900 rounded-xl h-12 md:w-1/4 grid place-items-center md:absolute left-0 top-0 md:group-hover:w-full z-10 duration-500"
      >
      <ArrowBigLeft className="text-white" />
      </div>
      <p className=" hidden md:block translate-x-1">Retourner</p>
    </button>
  )
}
