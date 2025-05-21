import { Building2, Globe, Phone } from "lucide-react";
import React from "react";

export default function Contact() {
  return (
    <div className="contact min-h-screen relative bg-gradient-to-b from-gray-50 to-gray-100">
      <div className="max-w-7xl mx-auto px-4 py-12 sm:px-6 lg:px-8 z-10">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-2">
            Contactez Nous
          </h1>
          <div className="w-20 h-1 bg-blue-600 mx-auto"></div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Map */}
          <MapFrame />
          {/* Contact Information */}
          <ContactInfo />
        </div>
      </div>
    </div>
  );
}
export const ContactInfo = () => {
  return (
    <div className="bg-white rounded-xl shadow-lg p-8 flex flex-col justify-evenly">
      <div className="space-y-6">
        <div className="flex items-start space-x-4">
          <Building2 className="w-6 h-6 text-blue-600 mt-1" />
          <div>
            <h3 className="font-semibold text-gray-900">
              ISTA NTIC BENI MELLAL
            </h3>
            <p className="text-gray-600">
              ISTA NTIC BENI MELLAL N8, Mghila 23000
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Phone className="w-6 h-6 text-blue-600" />
          <div>
            <p className="text-gray-600">0523423760</p>
          </div>
        </div>

        <div className="flex items-center space-x-4">
          <Globe className="w-6 h-6 text-blue-600" />
          <a
            href="https://www.ofppt.ma/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:text-blue-800 transition-colors"
          >
            www.ofppt.ma
          </a>
        </div>
      </div>

      <div className="mt-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">
          Heures d'ouverture
        </h3>
        <div className="space-y-2 text-gray-600">
          <p className="border-s-4 border-l-blue-500 ps-2">
            Lundi - Vendredi: 8:30 - 18:30
          </p>
          <p className="border-s-4 border-l-red-500 ps-2">
            Samedi - Dimanche: Fermé
          </p>
        </div>
      </div>
    </div>
  );
};
export function MapFrame() {
  return (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden">
      <iframe
        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3370.465766960451!2d-6.337034!3d32.353048699999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xda3866c8b3d4ae5%3A0x60d67c2ebcfa467e!2sISTA%20NTIC%20BENI%20MELLAL!5e0!3m2!1sen!2sma!4v1744165724575!5m2!1sen!2sma"
        width="600"
        height="450"
        style={{ border: 0 }}
        allowFullScreen=""
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
      />
    </div>
  );
}
