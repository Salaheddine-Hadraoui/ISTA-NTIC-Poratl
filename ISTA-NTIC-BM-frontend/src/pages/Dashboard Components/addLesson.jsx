import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import GoBackBtn from "../../components/GoBackBtn";
import { fetchCourses } from "../../sotre/slices/CoursSlice";
import { showNotify } from "../../sotre/slices/NotificationToast";
import { useDispatch } from "react-redux";
import { formatFileSize } from "./AddEvent";
import { SelectDropdown } from "./LessonDashboard";
import { LucideFileUp } from "lucide-react";

export default function AddCourseForm() {
  const [cours, setCourse] = useState({
    name: "",
    module_id: "",
    course_pdf: null,
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    setCourse({ ...cours, [name]: files ? files[0] : value });
  };

  const [errorsForm, setErrorsForm] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", cours.name);
    formData.append("module_id", cours.module_id);
    formData.append("course_pdf", cours.course_pdf);
    console.log(formData);
    console.log(cours);
    const res = await dispatch(
      fetchCourses({
        urlApi: "adminOnly/addNewcourses",
        courseInfo: formData,
        methodHTTP: "POST",
        isFormData: true,
      })
    );
    
    if (res.payload.data.errors) {
      setErrorsForm(res.payload.data.errors);
      dispatch(
        showNotify({
          title: "avertissement",
          text: "les valeurs que vous avez envoyées ne sont pas valides",
          success: false,
        })
      );
      
    } else if (res.payload.data.succes) {
      setCourse({
        name: "",
        module_id: "",
        course_pdf: null,
      });
      navigate(-1);
      dispatch(
        showNotify({
          title: "succès",
          text: "Course ajouté avec succès",
          success: true,
        })
      );
    }
  };
  const handleDrag = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

 
  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const fileDropped = e.dataTransfer.files[0];
    if (fileDropped) {
      setCourse((prev) => ({
        ...prev,
        course_pdf: fileDropped,
      }));
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-6 bg-white p-4 rounded-xl shadow-md">
      <div className="mb-2">
        <GoBackBtn />
      </div>
      <h2 className="text-3xl font-bold text-gray-800 mb-4 text-center">
        Add New Course
      </h2>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="w-full">
            <label className="block text-xs font-medium text-gray-700 mb-1">
              Nom de course
            </label>
            <input
              type="text"
              required
              name="name"
              value={cours.name}
              onChange={handleChange}
              className="w-full border border-gray-300 px-2 py-1 text-sm outline-0 focus:outline-none focus:ring-1 focus:ring-blue-500"
            />
            {errorsForm.name && (
              <p className="text-red-500 text-xs mt-1">{errorsForm.name}</p>
            )}
          </div>

          <SelectDropdown
            type="modules"
            value={cours.module_id}
            name="module_id"
            label="Module"
            Showerror={errorsForm.module_id}
            handleChange={handleChange}
          />

          
        </div>

        <div
          className="border-2 border-dashed border-gray-300 p-4 outline-0 text-center hover:border-blue-400 transition"
          onDragEnter={handleDrag}
          onDragOver={handleDrag}
          onDrop={handleDrop}
        >
          <label
            htmlFor="courseFile"
            className="cursor-pointer block text-xs text-gray-700"
          >
            <LucideFileUp className="text-indigo-700 mx-auto w-10 h-10 mb-1" />
            {cours.course_pdf
              ? cours.course_pdf.name
              : " Document de cours (PDFs)"}
          </label>
          {cours.course_pdf && (
            <p className="text-gray-500 text-[10px]">
              {formatFileSize(cours.course_pdf.size)}
            </p>
          )}
          {!cours.course_pdf && (
            <p className="text-gray-400 text-[10px]">PDF, 10MB max</p>
          )}
          {errorsForm.course_pdf && (
            <p className="text-red-500 text-xs mt-1">
              {errorsForm.course_pdf[0]}
            </p>
          )}
          <input
            id="courseFile"
            name="course_pdf"
            type="file"
            accept=".pdf"
            onChange={handleChange}
            className="hidden"
          />
        </div>

        {/* Buttons */}
        <div className="space-y-2 flex justify-end items-center gap-1.5">
          <button
            type="submit"
            className="px-8 m-0 cursor-pointer bg-blue-600 hover:bg-blue-700 text-white text-sm py-2 outline-0"
          >
            Add Course
          </button>
          <button
            type="button"
            onClick={() => navigate(-1)}
            className="px-8 cursor-pointer bg-gray-300 hover:bg-gray-400 text-gray-700 text-sm py-2 outline-0"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}
