import { AlertCircle, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import React from "react";

export default function ErrorAlert({ message, onClose }) {
  return (
    <AnimatePresence>
      {message && (
       <motion.div
       initial={{ opacity: 0, y: -30 }}
       animate={{ opacity: 1, y: 0 }}
       exit={{ opacity: 0, y: -30 }}
       transition={{ duration: 0.3 }}
       className="fixed top-1/2 left-1/2 z-50 transform -translate-x-1/2 -translate-y-1/2 bg-red-50 text-red-800 border border-red-300 rounded-lg shadow-md p-4 w-80 flex items-start gap-3"
     >
     
          <AlertCircle className="mt-1 w-5 h-5 text-red-500" />
          <div className="flex-1 text-sm">{message}</div>
          <button onClick={onClose} className="text-red-500 hover:text-red-700">
            <X className="w-4 h-4" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
